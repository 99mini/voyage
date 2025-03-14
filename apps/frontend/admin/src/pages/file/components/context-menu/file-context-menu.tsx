import { Copy, ExternalLink, FilePen, FolderIcon, FolderPen, Move, Trash } from 'lucide-react';

import { cn } from '@packages/vds';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

const FileContextMenuRoot = ({
  children,
  onOpenChange,
}: {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) => {
  return <ContextMenu onOpenChange={onOpenChange}>{children}</ContextMenu>;
};

const FileContextMenuTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <ContextMenuTrigger asChild className={className}>
      {children}
    </ContextMenuTrigger>
  );
};

type FileContextMenuContentProps = {
  className?: string;
  type: 'file' | 'folder';
  onLinkClick: () => void;
  onDetailInfoClick: () => void;
  onRenameClick: () => void;
  onCopyClick: () => void;
  onMoveClick: () => void;
  onDeleteClick: () => void;
};

const MenuItem = ({
  children,
  className,
  inset,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
  onClick?: () => void;
}) => {
  return (
    <ContextMenuItem inset={inset} onClick={onClick} className={cn('gap-2', className)}>
      {children}
    </ContextMenuItem>
  );
};

const FileContextMenuContent = ({
  className,
  type,
  onLinkClick,
  onCopyClick,
  onRenameClick,
  onDetailInfoClick,
  onMoveClick,
  onDeleteClick,
}: FileContextMenuContentProps) => {
  return (
    <ContextMenuContent className={cn('w-64', className)}>
      <MenuItem inset onClick={onLinkClick}>
        <ExternalLink className="h-4 w-4" />
        열기
      </MenuItem>
      <ContextMenuSeparator />
      <MenuItem inset onClick={onCopyClick}>
        <Copy className="h-4 w-4" />
        복사
      </MenuItem>
      <MenuItem inset onClick={onRenameClick}>
        {type === 'file' ? <FilePen className="h-4 w-4" /> : <FolderPen className="h-4 w-4" />}
        이름 변경
      </MenuItem>
      <MenuItem inset onClick={onMoveClick}>
        <Move className="h-4 w-4" />
        이동
      </MenuItem>
      <MenuItem inset onClick={onDetailInfoClick}>
        <FolderIcon className="h-4 w-4" />
        상세 정보
      </MenuItem>
      <ContextMenuSeparator />
      <MenuItem inset onClick={onDeleteClick}>
        <Trash className="h-4 w-4" />
        삭제
      </MenuItem>
    </ContextMenuContent>
  );
};

const FileContextMenu = {
  Root: FileContextMenuRoot,
  Trigger: FileContextMenuTrigger,
  Content: FileContextMenuContent,
};

export default FileContextMenu;
