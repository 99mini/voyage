import { useLocation } from 'react-router';

import FileList from './components/file-list';

const FilePage = () => {
  const location = useLocation();

  // URL 경로에서 /file 이후의 경로를 추출
  // /file/* 형식에서 * 부분을 가져옴
  const path = location.pathname.split('file/').slice(1).join('/');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">파일 관리</h1>
      <FileList path={path || undefined} />
    </div>
  );
};

export default FilePage;
