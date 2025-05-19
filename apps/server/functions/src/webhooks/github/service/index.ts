import { EXTENSION_TO_LANGUAGE, EXTENSION_TO_LANGUAGE_KEY, GITHUB_API, headers } from '../constants';
import { LangDetail, Repo } from '../types';

function getLangFromExt(path: string): EXTENSION_TO_LANGUAGE_KEY {
  const match = path.match(/\.(\w+)$/);
  if (!match) return 'etc';
  return EXTENSION_TO_LANGUAGE[match[1]] || 'etc';
}

async function countLinesInRawContent(url: string): Promise<number> {
  const res = await fetch(url, { headers });
  console.debug(`[INFO] Fetching ${url}...`);
  const body = await res.text();
  return body.split('\n').length;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return await res.json();
}

export async function processRepo(username: string, repo: Repo, langDetail: LangDetail): Promise<number> {
  const treeUrl = `${GITHUB_API}/repos/${username}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`;
  const tree = await fetchJSON<any>(treeUrl);

  // 1. blob만 필터링
  const blobs = (tree.tree as any[]).filter((item) => item.type === 'blob');

  // 2. 언어 확장자 필터링 및 정보 생성
  const blobLangs: { lang: EXTENSION_TO_LANGUAGE_KEY; path: string }[] = blobs.map((item) => ({
    ...item,
    lang: getLangFromExt(item.path),
  }));

  // 3. 비동기적으로 각 파일의 라인 수 계산
  const results = await Promise.all(
    blobLangs.map(async (item) => {
      const rawUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/${item.path}`;
      try {
        const lines = await countLinesInRawContent(rawUrl);
        return { lang: item.lang, lines };
      } catch {
        return null;
      }
    }),
  );

  // 4. 유효한 결과만 추출
  const validResults = results.filter((r): r is { lang: EXTENSION_TO_LANGUAGE_KEY; lines: number } => !!r);

  // 5. 라인 합산 및 언어별 정보 갱신
  const repoLanguages = new Set<EXTENSION_TO_LANGUAGE_KEY>();
  validResults.forEach(({ lang, lines }) => {
    if (!langDetail[lang]) {
      langDetail[lang] = { line: 0, repo: 0 };
    }
    langDetail[lang].line += lines;
    repoLanguages.add(lang);
  });

  // 6. 언어별 레포 수 증가
  Array.from(repoLanguages).forEach((lang) => {
    langDetail[lang].repo += 1;
  });

  const repoLines = validResults.reduce((acc, cur) => acc + cur.lines, 0);

  console.debug(`[INFO] Repo ${repo.name} has ${repoLines} lines of code...`);
  console.debug(`[INFO] Repo ${repo.name} has ${repoLanguages.size} languages...`);

  return repoLines;
}

export async function fetchAllRepos(username: string, limit: number): Promise<Repo[]> {
  let page = 1;
  let repos: Repo[] = [];
  let done = false;
  while (!done) {
    const pageRepos = await fetchJSON<Repo[]>(`${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}`);
    if (pageRepos.length === 0) break;
    const filtered = pageRepos.filter((repo) => !repo.fork);
    repos = repos.concat(filtered);
    if (repos.length >= limit) {
      repos = repos.slice(0, limit);
      done = true;
    }
    page++;
  }
  return repos;
}
