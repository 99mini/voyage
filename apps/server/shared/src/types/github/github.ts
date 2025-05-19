export type Repo = {
  name: string;
  fork: boolean;
  default_branch: string;
};

export type LangDetail = Record<string, { line: number; repo: number }>;

export type AnalyzeResult = {
  username: string;
  totalLine: number;
  languageCount: number;
  repoCount: number;
  languageDetail: LangDetail;
};
