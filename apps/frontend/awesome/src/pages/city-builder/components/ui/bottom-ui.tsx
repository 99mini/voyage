import { useState } from 'react';

import useActionStore from '@/pages/city-builder/store/action-store';
import { TabKey } from '@/pages/city-builder/types/tab';

import BuildMenu from './tab/build-menu';
import CityMenu from './tab/city-menu';
import EconomyMenu from './tab/economy-menu';
import LoadMenu from './tab/load-menu';
import TabMenu from './tab/tab-menu';
import UILayout from './ui-layout';

const BottomUI = () => {
  const [selected, setSelected] = useState<TabKey>('city');

  const { selectedAction, createLoad, deleteLoad, buildRoad, onSelectAction } = useActionStore.getState();

  const renderContent = (selected: TabKey) => {
    switch (selected) {
      case 'city':
        return <CityMenu />;
      case 'economy':
        return <EconomyMenu />;
      case 'load':
        return (
          <LoadMenu 
            onCreate={createLoad} 
            onDelete={deleteLoad} 
            buildRoad={buildRoad}
            selected={selectedAction} 
            onSelected={onSelectAction} 
          />
        );
      case 'build':
        return <BuildMenu />;
      default:
        return null;
    }
  };

  return (
    <UILayout position="bottom" className="w-full bg-white">
      <TabMenu selected={selected} onSelected={setSelected} />
      <div className="flex-grow h-full py-2">{renderContent(selected)}</div>
    </UILayout>
  );
};

export default BottomUI;
