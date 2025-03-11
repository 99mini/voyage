import { useToast } from '@packages/vds';

import { Copy } from 'lucide-react';

import { ReadFilesResponse } from '@/apis/files';

import { TableRow, TableCell } from '@/components/ui/table';
import File from '../item/file';

import { STATIC_PATH } from '@/lib/constants/static.constant';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { filetypeFor } from '@/lib/utils/file';

const FileRow = ({ file }: { file: ReadFilesResponse }) => {
  const { toast } = useToast();

  const ext = file.name.split('.').pop();

  return (
    <TableRow key={`file-${file.name}`}>
      <TableCell>
        <File {...file} />
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center justify-center min-w-12 w-max px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {filetypeFor(ext)}
        </span>
      </TableCell>
      <TableCell className="text-xs text-gray-500">
        <div className="w-full inline-flex items-center justify-between">
          <div className="truncate">{`${STATIC_PATH}/${file.path}`}</div>
          <Copy
            className="inline w-6 h-6 p-1 text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-gray-200 rounded-md"
            onClick={() =>
              copyToClipboard(`${STATIC_PATH}/${file.path}`, {
                onSuccess: () =>
                  toast({
                    description: '클립보드에 복사했어요.',
                    duration: 3000,
                  }),
                onError: () =>
                  toast({
                    description: '클립보드에 복사하지 못합니다.',
                    duration: 3000,
                  }),
              })
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FileRow;
