import { Meta } from '@storybook/react';

import { colors } from '../color';
import TokenBox from './token-box';

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
          {(Object.entries(colors[key]) as [string, string][]).map(([token, value]) => {
            return <TokenBox key={token} label={`${key}-${token}`} value={value} style={{ backgroundColor: value }} />;
          })}
        </div>
      ))}
    </div>
  );
};
