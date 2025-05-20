import { LangDetail, Repo } from '@server/shared';

import { GITHUB_API, headers } from '../constants';

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return await res.json();
}

export async function processRepo(username: string, repo: Repo, langDetail: LangDetail): Promise<number> {
  const langSizeRecord = await fetchJSON<Record<string, number>>(repo.languages_url);

  const validResults = Object.entries(langSizeRecord).map(([lang, size]) => ({ lang, size }));

  // 5. 라인 합산 및 언어별 정보 갱신
  const repoLanguages = new Set<string>();
  validResults.forEach(({ lang, size }) => {
    if (!langDetail[lang]) {
      langDetail[lang] = { size: 0, repo: 0 };
    }
    langDetail[lang].size += size;
    repoLanguages.add(lang);
  });

  // 6. 언어별 레포 수 증가
  Array.from(repoLanguages).forEach((lang) => {
    langDetail[lang].repo += 1;
  });

  const repoSize = validResults.reduce((acc, cur) => acc + cur.size, 0);

  console.debug(`[INFO] Repo ${repo.name} has ${repoSize} size of code...`);
  console.debug(`[INFO] Repo ${repo.name} has ${repoLanguages.size} languages...`);

  return repoSize;
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
