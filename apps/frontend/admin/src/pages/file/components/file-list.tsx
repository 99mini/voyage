import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { ChevronLeft } from 'lucide-react';

import { Table } from '@/components/ui/table';

import FileTableBody from './table/body';
import FileTableHeader from './table/header';
import { SortDirection, SortField } from './table/sort-icon';

import { useFilesQuery } from '@/apis/files';
import { ReadFilesResponse } from '@/apis/files/model';

import { PROTECTED_PATH } from '@/lib/constants/route.constant';

type FileListProps = {
  path?: string;
};

const FileList = ({ path }: FileListProps) => {
  const { data, isLoading, error } = useFilesQuery({
    path,
  });

  // 정렬 상태 관리
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // 정렬 핸들러
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // 같은 필드를 클릭하면 방향만 전환
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 필드를 클릭하면 해당 필드로 변경하고 오름차순으로 시작
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 상위 디렉토리 경로 계산
  const getParentPath = () => {
    if (!path || path === '/') return null;

    // 마지막 슬래시 제거
    const trimmedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    // 마지막 슬래시 위치 찾기
    const lastSlashIndex = trimmedPath.lastIndexOf('/');

    if (lastSlashIndex <= 0) {
      // 루트 디렉토리로 이동
      return '';
    }

    // 상위 디렉토리 경로 반환
    return trimmedPath.slice(0, lastSlashIndex);
  };

  const parentPath = getParentPath();

  // 파일과 폴더를 분리하고 정렬
  const sortedData = useMemo(() => {
    if (!data) return { folders: [], files: [] };

    // 폴더와 파일 분리
    const folders: ReadFilesResponse[] = [];
    const files: ReadFilesResponse[] = [];

    data.forEach((item) => {
      if (item.isDirectory) {
        folders.push(item);
      } else {
        files.push(item);
      }
    });

    // 정렬 함수
    const sortItems = (a: ReadFilesResponse, b: ReadFilesResponse) => {
      let comparison = 0;

      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'path') {
        comparison = a.path.localeCompare(b.path);
      } else if (sortField === 'type') {
        // 파일 확장자로 정렬
        const extA = a.name.split('.').pop() || '';
        const extB = b.name.split('.').pop() || '';
        comparison = extA.localeCompare(extB);
      }

      // 정렬 방향에 따라 결과 반전
      return sortDirection === 'asc' ? comparison : -comparison;
    };

    // 각각 정렬
    folders.sort(sortItems);
    files.sort(sortItems);

    return { folders, files };
  }, [data, sortField, sortDirection]);

  if (error) {
    return <div className="p-4 text-center text-red-500">파일 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 w-max">
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{path ? `/${path}` : '/'}</code>
          </div>
        </div>
        {parentPath !== null && (
          <Link
            to={`${PROTECTED_PATH.FILE}${parentPath ? `/${parentPath}` : ''}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="h-4 w-4" />
            상위 디렉토리로
          </Link>
        )}
      </div>

      {data?.length ? (
        <Table>
          <FileTableHeader sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
          <FileTableBody
            folders={sortedData.folders}
            files={sortedData.files}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </Table>
      ) : isLoading ? (
        <Table></Table>
      ) : (
        <div className="p-8 text-center text-gray-500">이 디렉토리에 파일이 없습니다.</div>
      )}
    </div>
  );
};

export default FileList;
