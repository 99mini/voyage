import { useParams } from 'react-router';

import { useReadResultFileQuery } from '@/apis/file/query';

const ResultDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useReadResultFileQuery();

  if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">에러가 발생했습니다.</div>;
  if (!data || data.length === 0)
    return <div className="p-8 text-center text-gray-500">이미지를 찾을 수 없습니다.</div>;

  const idx = Number(id);
  const item = data[idx];

  if (!item) return <div className="p-8 text-center text-gray-500">이미지를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col items-center">
      <img
        src={item.path}
        alt={item.name || '컬러링 이미지'}
        className="w-full max-w-lg object-contain rounded border mb-4 bg-white"
        crossOrigin="anonymous"
      />
      <div className="text-center text-gray-700 font-bold text-lg mb-2">{item.name || '컬러링 이미지'}</div>
    </div>
  );
};

export default ResultDetailPage;
