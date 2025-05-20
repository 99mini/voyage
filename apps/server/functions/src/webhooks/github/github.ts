import { AnalyzeResult, LangDetail } from '@server/shared';

import { fetchAllRepos, processRepo } from './service';

export async function analyzeUser({
  username,
  limit = 10,
}: {
  username: string;
  limit?: number;
}): Promise<AnalyzeResult> {
  const repos = await fetchAllRepos(username, limit);
  const languageDetail: LangDetail = {};
  const repoResults = await Promise.all(repos.map((repo) => processRepo(username, repo, languageDetail)));

  const result = {
    username,
    totalSize: repoResults.reduce((acc, cur) => acc + cur, 0),
    languageCount: Object.keys(languageDetail).length,
    repoCount: repoResults.length,
    languageDetail,
  };

  return result;
}
