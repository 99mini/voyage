import { useEffect, useRef, useState } from 'react';

import type { Meta } from '@storybook/react';

import PageProgress from './page-progress';

const meta: Meta<typeof PageProgress> = {
  title: 'atom/PageProgress',
  component: PageProgress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof PageProgress>;

const useContainer = () => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      ref.current = document.querySelector('#storybook-root') as HTMLElement;
    }
  }, []);

  return ref.current;
};

const useProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setProgress((prev) => (prev === 100 ? 0 : prev + 1)), 100);
    return () => clearInterval(timer);
  }, []);

  return progress;
};

const Dummy = () => {
  return (
    <div className="w-full">
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 16 }, (_, i) => (
          <li key={i} className="h-full w-full p-2 bg-gray-200 rounded-md">
            {`${i} item`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Default = ({ ...args }) => {
  const progress = useProgress();
  const container = useContainer();

  return (
    <div>
      <Dummy />
      <PageProgress container={container} value={progress} {...args} />
    </div>
  );
};

export const Bottom = ({ ...args }) => {
  const progress = useProgress();
  const container = useContainer();

  return (
    <div>
      <Dummy />
      <PageProgress position="bottom" container={container} value={progress} {...args} />
    </div>
  );
};

export const WithoutBorder = ({ ...args }) => {
  const progress = useProgress();
  const container = useContainer();

  return (
    <div>
      <Dummy />
      <PageProgress
        container={container}
        value={progress}
        progressBaseClassName="border-none"
        progressClassName="border-none"
        {...args}
      />
    </div>
  );
};

export const CustomProgressColor = ({ ...args }) => {
  const progress = useProgress();
  const container = useContainer();

  return (
    <div>
      <Dummy />
      <PageProgress container={container} value={progress} progressClassName="bg-red-500" {...args} />
    </div>
  );
};

export const CustomProgressBaseColor = ({ ...args }) => {
  const progress = useProgress();
  const container = useContainer();

  return (
    <div>
      <Dummy />
      <PageProgress container={container} value={progress} progressBaseClassName="bg-red-500" {...args} />
    </div>
  );
};

export default meta;
