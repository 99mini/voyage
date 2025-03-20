export const generateSafeHash = (str: string) => str.replace(/[()|\s|,|.|\\/]/g, '').replace(/[^ㄱ-핳a-zA-Z0-9]/g, '-');

export const camelCaseToPascalCase = (str: string) => str.replace(/([가-힣a-z])/g, (match) => match.toUpperCase());

export const camelCaseToKebabCase = (str: string) =>
  str.charAt(0) +
  str
    .slice(1)
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();

export const pascalCaseToKebabCase = (str: string) =>
  str.charAt(0).toLowerCase() +
  str
    .slice(1)
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();

export const kebabCaseToPascalCase = (str: string) => str.replace(/-([a-z])/g, (match) => match.toUpperCase());
