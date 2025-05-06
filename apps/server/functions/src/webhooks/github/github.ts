// --- 타입 선언 및 상수 분리 ---
import { GITHUB_API } from './constants';
import { fetchJSON, processRepo } from './service';
import { AnalyzeResult, LangDetail, Repo } from './types';

export async function analyzeUser({
  username,
  limit = 10,
}: {
  username: string;
  limit?: number;
}): Promise<AnalyzeResult> {
  // 1. 모든 레포를 페이지네이션으로 수집 (limit까지)
  let page = 1;
  let repos: Repo[] = [];
  let flag = true;

  while (flag) {
    const pageRepos = await fetchJSON<Repo[]>(`${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}`);
    if (pageRepos.length === 0) break;
    repos = repos.concat(pageRepos.filter((repo) => !repo.fork));
    if (repos.length >= limit) {
      repos = repos.slice(0, limit);
      flag = false;
    }
    page++;
  }

  // 2. 각 레포에 대해 processRepo를 병렬 실행
  const languageDetail: LangDetail = {};
  const repoResults = await Promise.all(repos.map((repo) => processRepo(username, repo, languageDetail)));

  // 3. 총 라인 수, 레포 수 등 집계
  const totalLine = repoResults.reduce((acc, cur) => acc + cur, 0);
  const repoCount = repoResults.length;
  const languageCount = Object.keys(languageDetail).length;

  return {
    totalLine,
    languageCount,
    repoCount,
    languageDetail,
  };
}
