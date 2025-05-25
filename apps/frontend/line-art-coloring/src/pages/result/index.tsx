import { Link } from 'react-router';

import { useReadResultFileQuery } from '@/apis/file/query';

const ResultPage = () => {
  const { data, isLoading, error } = useReadResultFileQuery();

  if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">에러가 발생했습니다.</div>;
  if (!data || data.length === 0)
    return <div className="p-8 text-center text-gray-500">저장된 컬러링 이미지가 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">완성된 컬러링 북</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item, idx: number) => (
          <Link
            key={item.path}
            to={`/result/${idx}`}
            className="flex flex-col items-center bg-white rounded shadow p-2 hover:ring-2 hover:ring-blue-400 transition cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            <img
              src={item.path}
              alt={item.name || `컬러링 이미지 ${idx + 1}`}
              className="w-full aspect-square object-contain rounded mb-2 border"
              loading="lazy"
              crossOrigin="anonymous"
            />
            <span className="text-xs text-gray-500 truncate w-full text-center">
              {item.name || `컬러링 이미지 ${idx + 1}`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
