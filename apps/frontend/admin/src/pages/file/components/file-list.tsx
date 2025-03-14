import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { ChevronRight, Eye, EyeOff, FilePlus, FolderIcon, FolderPlus } from 'lucide-react';

import { FileInput, Input, cn } from '@packages/vds';

import { useFilesQuery } from '@/apis/files';
import { ReadFilesResponse } from '@/apis/files/model';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import useDebounce from '@/hooks/use-debounce';

import useCreateFolder from '../hooks/use-create-folder';
import useUploadFile from '../hooks/use-upload-file';

import { PROTECTED_PATH } from '@/lib/constants/route.constant';
import { filetypeFor } from '@/lib/utils/file';

import FileTableBody from './table/body';
import FileTableHeader from './table/header';
import { SortDirection, SortField } from './table/sort-icon';

type FileListProps = {
  path?: string;
};

const FileList = ({ path }: FileListProps) => {
  const splittedPath = useMemo(() => {
    const splittedPath = path
      ? (() => {
          const parts = path.split('/').map(decodeURIComponent);
          return [undefined, ...parts.map((_, index) => parts.slice(0, index + 1).join('/'))];
        })()
      : [undefined];

    return splittedPath;
  }, [path]);

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

  // MARK: 폴더 생성 로직
  const {
    directoryRef,
    directoryName,
    onChangeDirectoryName,
    isPendingCreateDirectory,
    onPendingCreateDirectory,
    onCreateDirectory,
    onBlurDirectoryName,
  } = useCreateFolder();

  // <--폴더 생성 로직 끝

  // MARK: 파일 업로드 로직
  const { onUploadFile } = useUploadFile(path ? decodeURIComponent(path) : undefined);

  /** Show All/Hide Columns Toggle */
  const handleShowColumnsToggle = () => setShowAllColumns((prev) => !prev);

  /** Search Change */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /** Sort */
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

  /** 데이터 정렬 */
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
            <div className="inline-flex gap-2">
              {splittedPath.map((item, index) => (
                <Fragment key={index}>
                  <Link to={`${PROTECTED_PATH.FILE}${item ? `/${item}` : ''}`}>
                    <code
                      className={cn(
                        `block h-6 px-2 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200`,
                        index === splittedPath.length - 1 ? 'text-black' : 'text-gray-500',
                      )}
                    >
                      {item?.split('/').pop() || 'file'}
                    </code>
                  </Link>
                  {index !== splittedPath.length - 1 && (
                    <span className="inline-flex items-center justify-center text-gray-500 ">
                      <ChevronRight width={16} height={16} />
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 sm:h-20 p-4 border-b flex flex-col sm:flex-row items-end justify-between">
        <div className="h-10">
          <Input
            placeholder="파일명, 확장자, 경로로 찾기"
            className="w-64 h-10 text-xs sm:w-96"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-end gap-2">
          {/* Upload Folder */}
          <label
            className="p-1 rounded-md border border-blue-500 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <FilePlus className="h-5 w-5 text-blue-500" />
            <FileInput
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                onUploadFile(file);
              }}
            />
          </label>
          {/* Create Folder */}
          <button
            className="p-1 rounded-md border border-blue-500 hover:bg-gray-100 flex items-center gap-2"
            onClick={onPendingCreateDirectory}
          >
            <FolderPlus className="h-5 w-5 text-blue-500" />
          </button>
          {/* Show All Columns */}
          <button
            onClick={handleShowColumnsToggle}
            className="p-1 rounded-md border border-blue-500 hover:bg-gray-100 flex items-center gap-2"
            title={showAllColumns ? '열 숨기기' : '모든 열 보기'}
          >
            <div className="text-sm text-gray-500">{showAllColumns ? '열 숨기기' : '모든 열 보기'}</div>
            {showAllColumns ? <Eye className="h-4 w-4 text-gray-500" /> : <EyeOff className="h-4 w-4 text-gray-500" />}
          </button>
        </div>
      </div>

      {data?.length ? (
        <Table>
          <FileTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            showAllColumns={showAllColumns}
          />
          <TableBody>
            <FileTableBody
              files={searchFiles}
              sortField={sortField}
              sortDirection={sortDirection}
              showAllColumns={showAllColumns}
            />
            {isPendingCreateDirectory && (
              <TableRow className="hover:bg-blue-50 bg-blue-50">
                <TableCell colSpan={1} className="flex items-center gap-2 h-[42px]">
                  <FolderIcon className="h-5 w-5 text-yellow-500" fill={'currentColor'} />
                  <Input
                    ref={directoryRef}
                    onBlur={onBlurDirectoryName}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onCreateDirectory(directoryName);
                      }
                    }}
                    onChange={(e) => onChangeDirectoryName(e.target.value)}
                    className="h-8 text-xs shadow-none bg-white"
                    value={directoryName}
                    placeholder=""
                  />
                </TableCell>
                <TableCell colSpan={7}></TableCell>
              </TableRow>
            )}
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={8}
                style={{
                  height: `${Math.max(12 - searchFiles.length, 1) * 32}px`,
                }}
              ></TableCell>
            </TableRow>
          </TableBody>
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
