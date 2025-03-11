import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

import { Input } from '@packages/vds';

import { Table } from '@/components/ui/table';

import FileTableBody from './table/body';
import FileTableHeader from './table/header';
import { SortDirection, SortField } from './table/sort-icon';

import useDebounce from '@/hooks/use-debounce';

import { useFilesQuery } from '@/apis/files';
import { ReadFilesResponse } from '@/apis/files/model';

import { PROTECTED_PATH } from '@/lib/constants/route.constant';
import { filetypeFor } from '@/lib/utils/file';

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
  // 모든 컬럼 표시 여부 상태
  const [showAllColumns, setShowAllColumns] = useState(false);

  // 검색 상태
  const [search, setSearch] = useState('');

  const handleShowColumnsToggle = () => setShowAllColumns((prev) => !prev);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

  // 데이터 정렬
  const sortedData = useMemo(() => {
    if (!data) return [];

    // 폴더와 파일 분리
    const folders = data.filter((item) => item.isDirectory);
    const files = data.filter((item) => !item.isDirectory);

    // 정렬 함수
    const sortItems = (items: ReadFilesResponse[]) => {
      return [...items].sort((a, b) => {
        let compareResult = 0;

        // 정렬 필드에 따라 비교
        switch (sortField) {
          case 'name':
            compareResult = a.name.localeCompare(b.name);
            break;
          case 'path':
            compareResult = a.path.localeCompare(b.path);
            break;
          case 'type':
            compareResult =
              a.isDirectory && b.isDirectory
                ? 1
                : a.isDirectory
                  ? -1
                  : b.isDirectory
                    ? 1
                    : filetypeFor(a.name.split('.').pop()).localeCompare(filetypeFor(b.name.split('.').pop()));
            break;
          case 'size':
            // 크기 비교 (폴더는 크기가 없으므로 0으로 처리)
            compareResult = (a.size || 0) - (b.size || 0);
            break;
          case 'createdAt':
            // 생성일 비교
            compareResult = a.birthtimeMs - b.birthtimeMs;
            break;
          case 'updatedAt':
            // 수정일 비교
            compareResult = a.mtimeMs - b.mtimeMs;
            break;
          default:
            compareResult = 0;
        }

        // 정렬 방향에 따라 결과 반전
        return sortDirection === 'asc' ? compareResult : -compareResult;
      });
    };

    const sortedMixes = sortItems([...folders, ...files]);

    return sortedMixes;
  }, [data, sortField, sortDirection]);

  const debouncedSearch = useDebounce(search, 250);

  const searchFiles = useMemo(() => {
    return sortedData.filter((item) => {
      return (
        item.name.includes(debouncedSearch) ||
        item.path.includes(debouncedSearch) ||
        filetypeFor(item.name.split('.').pop()).includes(debouncedSearch)
      );
    });
  }, [sortedData, debouncedSearch]);

  if (error) {
    return <div className="p-4 text-center text-red-500">파일 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 w-max h-[24px]">
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
      <div className="p-4 border-b flex items-center justify-between">
        <Input
          placeholder="파일명, 확장자, 경로로 찾기"
          className="w-32 text-xs sm:w-96"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          onClick={handleShowColumnsToggle}
          className="p-1 rounded-md hover:bg-gray-100 flex items-center gap-1"
          title={showAllColumns ? '열 숨기기' : '모든 열 보기'}
        >
          <div className="text-xs text-gray-500">{showAllColumns ? '열 숨기기' : '모든 열 보기'}</div>
          {showAllColumns ? <Eye className="h-4 w-4 text-gray-500" /> : <EyeOff className="h-4 w-4 text-gray-500" />}
        </button>
      </div>

      {data?.length ? (
        <Table>
          <FileTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            showAllColumns={showAllColumns}
          />
          <FileTableBody
            files={searchFiles}
            sortField={sortField}
            sortDirection={sortDirection}
            showAllColumns={showAllColumns}
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
