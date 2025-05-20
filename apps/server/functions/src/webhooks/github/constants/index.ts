export const GITHUB_API = 'https://api.github.com';
export const PAT = process.env.GITHUB_TOKEN || '';

export const headers: Record<string, string> = {
  ...(PAT && { Authorization: `Bearer ${PAT}` }),
  'User-Agent': 'LineCounter',
};

export type EXTENSION_TO_LANGUAGE_KEY =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'ruby'
  | 'go'
  | 'rust'
  | 'c/c++'
  | 'objective-c'
  | 'c#'
  | 'php'
  | 'html'
  | 'css'
  | 'json'
  | 'yaml'
  | 'markdown'
  | 'mdx'
  | 'shell'
  | 'etc';

export const EXTENSION_TO_LANGUAGE: Record<string, EXTENSION_TO_LANGUAGE_KEY> = {
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
  cpp: 'c/c++',
  c: 'c/c++',
  m: 'objective-c',
  mm: 'objective-c',
  h: 'objective-c',
  cs: 'c#',
  php: 'php',
  html: 'html',
  css: 'css',
  scss: 'css',
  sass: 'css',
  json: 'json',
  yml: 'yaml',
  yaml: 'yaml',
  md: 'markdown',
  mdx: 'mdx',
  sh: 'shell',
  bash: 'shell',
};
