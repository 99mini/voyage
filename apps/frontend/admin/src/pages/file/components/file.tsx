import { ReadFilesResponse } from '@/apis/files';

type FileProps = Pick<ReadFilesResponse, 'name' | 'isFile' | 'parentPath' | 'path'>;

const File = ({ name, isFile, parentPath, path }: FileProps) => {
  if (!isFile) return null;

  return (
    <div className="flex justify-between">
      <div className="flex-1">{name}</div>
      <div className="w-24">{path}</div>
    </div>
  );
};

export default File;
