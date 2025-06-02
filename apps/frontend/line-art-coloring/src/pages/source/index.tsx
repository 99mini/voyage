import { Link } from 'react-router';

import { useReadSourceFileQuery } from '@/apis/file/query';

const SourcePage = () => {
  const { data, isLoading, error } = useReadSourceFileQuery();

  if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">에러가 발생했습니다.</div>;
  if (!data || data.length === 0)
    return <div className="p-8 text-center text-gray-500">라인아트 이미지가 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">라인아트 이미지 선택</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item, idx: number) => (
          <Link
            key={item.path}
            className="flex flex-col items-center bg-white rounded shadow p-2 hover:ring-2 hover:ring-blue-400 transition"
            to={`/coloring?src=${encodeURIComponent(item.path)}`}
          >
            <img
              src={item.path}
              alt={item.name || `라인아트 이미지 ${idx + 1}`}
              className="w-full aspect-square object-contain rounded mb-2 border"
              loading="lazy"
              crossOrigin="anonymous"
            />
            <span className="text-xs text-gray-500 truncate w-full text-center">
              {item.name || `라인아트 이미지 ${idx + 1}`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SourcePage;
