import { cn } from '@packages/vds';
import { ActionType } from '@/pages/city-builder/store/action-store';

type LoadMenuProps = {
  onCreate: () => void;
  onDelete: () => void;
  buildRoad: () => void;
  selected: ActionType;
  onSelected: (selected: ActionType) => void;
};

const LoadMenu = ({ onCreate, onDelete, buildRoad, selected, onSelected }: LoadMenuProps) => {
  const handleCreate = () => {
    onSelected('create');
    onCreate();
  };

  const handleDelete = () => {
    onSelected('delete');
    onDelete();
  };

  const handleBuildRoad = () => {
    onSelected('buildRoad');
    buildRoad();
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
      <button
        className={cn(
          'px-2 py-1 border rounded transition-colors hover:bg-gray-200 active:bg-gray-300',
          selected === 'buildRoad' && 'bg-gray-200 border-green-300',
        )}
        onClick={handleBuildRoad}
      >
        길 만들기
      </button>
    </div>
  );
};

export default LoadMenu;
