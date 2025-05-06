const GITHUB_API = 'https://api.github.com';
const PAT = process.env.GITHUB_TOKEN || '';

const headers = { ...(PAT && { Authorization: `Bearer ${PAT}` }), 'User-Agent': 'LineCounter' };

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  java: 'java',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  cpp: 'cpp',
  c: 'c',
  cs: 'csharp',
  php: 'php',
  html: 'html',
  css: 'css',
  scss: 'css',
  sass: 'css',
  json: 'json',
  yml: 'yaml',
  yaml: 'yaml',
  md: 'markdown',
  sh: 'shell',
  bash: 'shell',
};

function getLangFromExt(path: string): string | null {
  const match = path.match(/\.(\w+)$/);
  if (!match) return null;
  return EXTENSION_TO_LANGUAGE[match[1]] || null;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return await res.json();
}

async function countLinesInRawContent(url: string): Promise<number> {
  const res = await fetch(url, { headers });
  console.debug(`[INFO] Fetching ${url}...`);
  const body = await res.text();
  return body.split('\n').length;
}

async function processRepo(username: string, repo: any, langDetail: any): Promise<number> {
  const treeUrl = `${GITHUB_API}/repos/${username}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`;
  const tree = await fetchJSON<any>(treeUrl);
  let repoLanguages = new Set<string>();
  let repoLines = 0;

  for (const item of tree.tree) {
    if (item.type !== 'blob') continue;
    const lang = getLangFromExt(item.path);
    if (!lang) continue;

    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/${item.path}`;
    try {
      const lines = await countLinesInRawContent(rawUrl);
      repoLines += lines;

      if (!langDetail[lang]) {
        langDetail[lang] = { line: 0, repo: 0 };
      }
      langDetail[lang].line += lines;
      repoLanguages.add(lang);
    } catch {
      continue; // Skip files that can't be read
    }
  }

  console.debug(`[INFO] Repo ${repo.name} has ${repoLines} lines of code...`);
  console.debug(`[INFO] Repo ${repo.name} has ${repoLanguages.size} languages...`);

  // Count languages used in this repo
  for (const lang of Array.from(repoLanguages)) {
    langDetail[lang].repo += 1;
  }

  return repoLines;
}

export async function analyzeUser({ username, limit = 10 }: { username: string; limit?: number }) {
  let page = 1;
  let totalLine = 0;
  let repoCount = 0;
  const languageDetail: any = {};

  let flag = true;
  while (flag) {
    const repos = await fetchJSON<any[]>(`${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}`);
    console.debug(`[INFO] Processing page ${page}...`);
    console.debug(`[INFO] Found ${repos.length} repos...`);
    if (repos.length === 0) break;

    for (const repo of repos) {
      if (repoCount >= limit) {
        flag = false;
        break;
      }
      if (repo.fork) continue;
      try {
        const repoLines = await processRepo(username, repo, languageDetail);
        totalLine += repoLines;
        repoCount++;
      } catch (err) {
        console.error(`Error processing repo ${repo.name}: ${err}`);
        continue;
      }
    }

    page++;
  }

  const result = {
    totalLine,
    languageCount: Object.keys(languageDetail).length,
    repoCount,
    languageDetail,
  };

  return result;
}
