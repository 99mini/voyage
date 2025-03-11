import { TableBody } from '@/components/ui/table';

import { ReadFilesResponse } from '@/apis/files/model';

import FileRow from './file-row';
import FolderRow from './folder-row';
import { SortDirection, SortField } from './sort-icon';

interface FileTableBodyProps {
  folders: ReadFilesResponse[];
  files: ReadFilesResponse[];
  sortField: SortField;
  sortDirection: SortDirection;
}

/**
 * 파일 목록 테이블의 본문 컴포넌트
 */
const FileTableBody = ({ folders, files, sortField, sortDirection }: FileTableBodyProps) => {
  // 타입으로 정렬할 때는 정렬 방향에 따라 폴더/파일 순서 결정
  if (sortField !== 'type') {
    // 다른 필드로 정렬할 때는 항상 폴더 먼저
    return (
      <TableBody>
        {folders.map((folder) => (
          <FolderRow key={`folder-${folder.name}`} folder={folder} />
        ))}
        {files.map((file) => (
          <FileRow key={`file-${file.name}`} file={file} />
        ))}
      </TableBody>
    );
  }

  if (sortDirection === 'asc') {
    // 오름차순: 폴더 먼저
    return (
      <TableBody>
        {folders.map((folder) => (
          <FolderRow key={`folder-${folder.name}`} folder={folder} />
        ))}
        {files.map((file) => (
          <FileRow key={`file-${file.name}`} file={file} />
        ))}
      </TableBody>
    );
  } else {
    // 내림차순: 파일 먼저
    return (
      <TableBody>
        {files.map((file) => (
          <FileRow key={`file-${file.name}`} file={file} />
        ))}
        {folders.map((folder) => (
          <FolderRow key={`folder-${folder.name}`} folder={folder} />
        ))}
      </TableBody>
    );
  }
};

export default FileTableBody;