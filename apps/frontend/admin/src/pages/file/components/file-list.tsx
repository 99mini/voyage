import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { ChevronLeft, ChevronDown, ChevronUp, ExternalLinkIcon } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useFilesQuery } from '@/apis/files';
import { ReadFilesResponse } from '@/apis/files/model';

import { PROTECTED_PATH } from '@/lib/constants/route.constant';

import File from './file';
import Folder from './folder';
import { STATIC_PATH } from '@/lib/constants/static.constant';

type FileListProps = {
  path?: string;
};

type SortField = 'name' | 'type' | 'path';
type SortDirection = 'asc' | 'desc';

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

  // 정렬 아이콘 렌더링
  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;

    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />;
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

  if (isLoading) {
    return <div className="p-4 text-center">파일 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">파일 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">현재 경로:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{path || '/'}</code>
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
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%] cursor-pointer hover:bg-gray-50" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  이름
                  {renderSortIcon('name')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort('type')}>
                <div className="flex items-center">
                  유형
                  {renderSortIcon('type')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort('path')}>
                <div className="flex items-center">
                  경로
                  {renderSortIcon('path')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortField === 'type' ? (
              // 타입으로 정렬할 때는 정렬 방향에 따라 폴더/파일 순서 결정
              <>
                {sortDirection === 'asc' ? (
                  // 오름차순: 폴더 먼저
                  <>
                    {/* 폴더 먼저 표시 */}
                    {sortedData.folders.map((folder) => (
                      <TableRow key={`folder-${folder.name}`}>
                        <TableCell>
                          <Folder {...folder} />
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            폴더
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{folder.path}</TableCell>
                      </TableRow>
                    ))}

                    {/* 그 다음 파일 표시 */}
                    {sortedData.files.map((file) => (
                      <TableRow key={`file-${file.name}`}>
                        <TableCell>
                          <File {...file} />
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            파일
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{file.path}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  // 내림차순: 파일 먼저
                  <>
                    {/* 파일 먼저 표시 */}
                    {sortedData.files.map((file) => (
                      <TableRow key={`file-${file.name}`}>
                        <TableCell>
                          <File {...file} />
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            파일
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{file.path}</TableCell>
                      </TableRow>
                    ))}

                    {/* 그 다음 폴더 표시 */}
                    {sortedData.folders.map((folder) => (
                      <TableRow key={`folder-${folder.name}`}>
                        <TableCell>
                          <Folder {...folder} />
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            폴더
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{folder.path}</TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </>
            ) : (
              // 다른 필드로 정렬할 때는 항상 폴더 먼저
              <>
                {/* 폴더 먼저 표시 */}
                {sortedData.folders.map((folder) => (
                  <TableRow key={`folder-${folder.name}`}>
                    <TableCell>
                      <Folder {...folder} />
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        폴더
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">{folder.path}</TableCell>
                  </TableRow>
                ))}

                {/* 그 다음 파일 표시 */}
                {sortedData.files.map((file) => (
                  <TableRow key={`file-${file.name}`}>
                    <TableCell>
                      <File {...file} />
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        파일
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      <a
                        href={`${STATIC_PATH}/${file.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        {file.path}
                        <ExternalLinkIcon className="inline w-4 h-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="p-8 text-center text-gray-500">이 디렉토리에 파일이 없습니다.</div>
      )}
    </div>
  );
};

export default FileList;
