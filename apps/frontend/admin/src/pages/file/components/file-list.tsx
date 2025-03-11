import { Link } from 'react-router';

import { ChevronLeft } from 'lucide-react';

import { cn } from '@packages/vds';

import { useFilesQuery } from '@/apis/files';

import { PROTECTED_PATH } from '@/lib/constants/route.constant';

import File from './file';
import Folder from './folder';

type FileListProps = {
  path?: string;
};

const FileList = ({ path }: FileListProps) => {
  const { data, isLoading, error } = useFilesQuery({
    path,
  });

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
        <ul className="divide-y divide-gray-100">
          {data.map((file, index) => {
            const isLast = index === data.length - 1;
            const isFirst = index === 0;

            return (
              <li
                key={file.name}
                className={cn('transition-colors', isFirst && 'rounded-t-md', isLast && 'rounded-b-md')}
              >
                {file.isDirectory ? (
                  <Folder {...file} isLast={isLast} isFirst={isFirst} />
                ) : (
                  <File {...file} isLast={isLast} isFirst={isFirst} />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="p-8 text-center text-gray-500">이 디렉토리에 파일이 없습니다.</div>
      )}
    </div>
  );
};

export default FileList;
