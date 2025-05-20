export type Repo = {
  name: string;
  fork: boolean;
  default_branch: string;
  languages_url: string;
};

export type LangDetail = Record<string, { size: number; repo: number }>;

export type AnalyzeResult = {
  username: string;
  totalSize: number;
  languageCount: number;
  repoCount: number;
  languageDetail: LangDetail;
};
