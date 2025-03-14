import FileRow from './file-row';
import FolderRow from './folder-row';
import { SortDirection, SortField } from './sort-icon';

import { ReadFilesResponse } from '@/apis/files/model';

type FileTableBodyProps = {
  files: ReadFilesResponse[];
  sortField: SortField;
  sortDirection: SortDirection;
  showAllColumns: boolean;
};

/**
 * 파일 목록 테이블의 본문 컴포넌트
 */
const FileTableBody = ({ files, sortField, sortDirection, showAllColumns }: FileTableBodyProps) => {
  // 타입으로 정렬할 때는 정렬 방향에 따라 폴더/파일 순서 결정
  if (sortField !== 'type') {
    // 다른 필드로 정렬할 때는 항상 폴더 먼저
    return (
      <>
        {files.map((file) => {
          const isDir = file.isDirectory;
          if (isDir) {
            return <FolderRow key={`folder-${file.name}`} folder={file} showAllColumns={showAllColumns} />;
          }
          return <FileRow key={`file-${file.name}`} file={file} showAllColumns={showAllColumns} />;
        })}
      </>
    );
  }

  if (sortDirection === 'asc') {
    // 오름차순: 폴더 먼저
    return (
      <>
        {files.map((file) => {
          const isDir = file.isDirectory;
          if (isDir) {
            return <FolderRow key={`folder-${file.name}`} folder={file} showAllColumns={showAllColumns} />;
          }
          return <FileRow key={`file-${file.name}`} file={file} showAllColumns={showAllColumns} />;
        })}
      </>
    );
  } else {
    // 내림차순: 파일 먼저
    return (
      <>
        {files.map((file) => {
          const isDir = file.isDirectory;
          if (isDir) {
            return <FolderRow key={`folder-${file.name}`} folder={file} showAllColumns={showAllColumns} />;
          }
          return <FileRow key={`file-${file.name}`} file={file} showAllColumns={showAllColumns} />;
        })}
      </>
    );
  }
};

export default FileTableBody;
