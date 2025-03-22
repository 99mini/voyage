import { cn } from '@packages/vds';

import { TabKey } from '@/pages/city-builder/types/tab';

const TABS: { label: string; value: TabKey }[] = [
  { label: 'City', value: 'city' },
  { label: 'Economy', value: 'economy' },
  { label: 'Load', value: 'load' },
  { label: 'Build', value: 'build' },
];

type TabMenuProps = {
  selected: TabKey;
  onSelected: (tab: TabKey) => void;
  className?: string;
  children?: React.ReactNode;
};

const TabMenu = ({ selected, onSelected, className, children }: TabMenuProps) => {
  return (
    <div className={cn('flex gap-2', className)}>
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onSelected(tab.value)}
          className={cn('px-2 py-1 border rounded', selected === tab.value && 'bg-gray-200')}
        >
          {tab.label}
        </button>
      ))}
      {children}
    </div>
  );
};

export default TabMenu;
