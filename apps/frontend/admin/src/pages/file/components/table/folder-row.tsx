import { ReadFilesResponse } from '@/apis/files';

import { TableRow, TableCell } from '@/components/ui/table';
import Folder from '../item/folder';

const FolderRow = ({ folder }: { folder: ReadFilesResponse }) => {
  return (
    <TableRow key={`folder-${folder.name}`}>
      <TableCell>
        <Folder {...folder} />
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center justify-center min-w-12 w-max px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          폴더
        </span>
      </TableCell>
      <TableCell className="text-xs text-gray-500">{'--'}</TableCell>
    </TableRow>
  );
};

export default FolderRow;
