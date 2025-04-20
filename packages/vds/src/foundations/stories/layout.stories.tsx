import { Meta } from '@storybook/react';

import { spacing } from '../layout';

export default {
  title: 'Foundations/Layout',
} as Meta;

export const SpacingScale = () => (
  <div>
    {Object.entries(spacing).map(([key, value]) => (
      <div key={key} className="flex flex-col gap-2 mb-2">
        <div>{`gap-${key}`}</div>
        <div className="flex flex-row">
          {Array.from({ length: 3 }).map((_, index) => {
            if (index === 1) {
              return <div key={index} className="h-8 bg-vds-success-500" style={{ width: value }}></div>;
            }
            return <div key={index} className="size-8 bg-vds-primary-500" />;
          })}
        </div>
        <div className="flex flex-col gap-1 text-vds-caption-sm text-vds-gray-800">
          <div>{value}</div>
        </div>
      </div>
    ))}
  </div>
);
