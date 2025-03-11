import { useFilesQuery } from '@/apis/files';

import File from './file';
import Folder from './folder';

type FileListProps = {
  path?: string;
};

const FileList = ({ path }: FileListProps) => {
  const { data } = useFilesQuery({
    path,
  });

  return (
    <div className="space-y-2 ">
      <span>{path ?? '/'}</span>
      <ul className="space-y-2">
        {data?.map((file) => <li key={file.name}>{file.isDirectory ? <Folder {...file} /> : <File {...file} />}</li>)}
      </ul>
    </div>
  );
};

export default FileList;
