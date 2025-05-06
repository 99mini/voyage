export const GITHUB_API = 'https://api.github.com';
export const PAT = process.env.GITHUB_TOKEN || '';

export const headers: Record<string, string> = {
  ...(PAT && { Authorization: `Bearer ${PAT}` }),
  'User-Agent': 'LineCounter',
};

export const EXTENSION_TO_LANGUAGE: Record<string, string> = {
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
