export const filetypeFor = (ext?: string) => {
  const lowerCaseExt = ext?.toLowerCase() ?? '';
  switch (lowerCaseExt) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'webp':
      return `${lowerCaseExt.toUpperCase()} 이미지`;
    case 'mp4':
    case 'ts':
    case 'mpeg':
    case 'avi':
    case 'mov':
      return `${lowerCaseExt.toUpperCase()} 동영상`;
    case 'html':
    case 'svg':
    case 'pdf':
    case 'json':
    case 'csv':
    case 'tsv':
      return `${lowerCaseExt.toUpperCase()} 문서`;
    case 'zip':
    case 'egg':
    case 'arj':
    case 'cab':
    case '7z':
    case 'tar':
    case 'gz':
    case 'bz2':
    case 'apk':
      return `${lowerCaseExt.toUpperCase()} 아카이브`;
    case 'doc':
      return 'Microsoft Word document (.doc)';
    case 'docx':
      return 'Microsoft Word document (.docx)';
    case 'xlsx':
      return 'Microsoft Excel document (.xlsx)';
    case 'xls':
      return 'Microsoft Excel document (.xls)';
    case 'ppt':
      return 'Microsoft PowerPoint document (.ppt)';
    case 'pptx':
      return 'Microsoft PowerPoint document (.pptx)';
    case 'txt':
      return '일반 텍스트 문서';
    default:
      return 'file';
  }
};
