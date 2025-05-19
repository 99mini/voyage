import { AnalyzeResult, LangDetail } from '@server/shared';

import { fetchAllRepos, processRepo } from './service';

export async function analyzeUser({
  username,
  limit = 10,
}: {
  username: string;
  limit?: number;
}): Promise<AnalyzeResult> {
  // 1. 모든 레포를 함수형으로 수집
  const repos = await fetchAllRepos(username, limit);
  // 2. 언어별 집계 객체 준비
  const languageDetail: LangDetail = {};
  // 3. 레포 라인 수 병렬 집계
  const repoResults = await Promise.all(repos.map((repo) => processRepo(username, repo, languageDetail)));
  // 4. 결과 집계 (reduce만 사용)
  const result = {
    username,
    totalLine: repoResults.reduce((acc, cur) => acc + cur, 0),
    languageCount: Object.keys(languageDetail).length,
    repoCount: repoResults.length,
    languageDetail,
  };

  return result;
}
