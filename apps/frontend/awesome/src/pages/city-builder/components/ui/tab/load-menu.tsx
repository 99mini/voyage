import { cn } from '@packages/vds';

type LoadMenuProps = {
  onCreate: () => void;
  onDelete: () => void;
  selected: 'create' | 'delete' | null;
  onSelected: (selected: 'create' | 'delete' | null) => void;
};

const LoadMenu = ({ onCreate, onDelete, selected, onSelected }: LoadMenuProps) => {
  const handleCreate = () => {
    onSelected('create');
    onCreate();
  };

  const handleDelete = () => {
    onSelected('delete');
    onDelete();
  };

  return (
    <div className="flex gap-2">
      <button
        className={cn(
          'px-2 py-1 border rounded transition-colors hover:bg-gray-200 active:bg-gray-300',
          selected === 'create' && 'bg-gray-200 border-blue-300',
        )}
        onClick={handleCreate}
      >
        Create
      </button>
      <button
        className={cn(
          'px-2 py-1 border rounded transition-colors hover:bg-gray-200 active:bg-gray-300',
          selected === 'delete' && 'bg-gray-200 border-red-300',
        )}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default LoadMenu;
