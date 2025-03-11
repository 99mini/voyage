import { ReadFilesResponse } from '@/apis/files';

type FolderProps = Pick<ReadFilesResponse, 'name' | 'isDirectory' | 'parentPath' | 'path'>;

const Folder = ({ name, isDirectory, parentPath, path }: FolderProps) => {
  if (!isDirectory) return null;

  return (
    <div className="flex justify-between">
      <div className="flex-1">{name}</div>
      <div className="w-24">{path}</div>
    </div>
  );
};

export default Folder;
