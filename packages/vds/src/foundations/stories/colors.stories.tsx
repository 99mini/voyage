import { Meta } from '@storybook/react';

import { colors } from '../color';

export default {
  title: 'Foundations/Colors',
} as Meta;

export const Palette = () => {
  const tokenKeyList = Object.keys(colors);

  return (
    <div>
      {tokenKeyList.map((key) => (
        <div className="flex flex-col gap-2 mb-2" key={key}>
          {key}
          <div className="flex flex-row">
            {(Object.entries(colors[key]) as [string, string][]).map(([token, value]) => {
              return (
                <div key={token} className="flex flex-col gap-2 w-40">
                  <div className={'w-full h-4'} style={{ backgroundColor: value }} />
                  <div className="flex flex-col gap-1 text-vds-caption-sm text-vds-gray-800">
                    <div>{`${key}-${token}`}</div>
                    <div>{value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
