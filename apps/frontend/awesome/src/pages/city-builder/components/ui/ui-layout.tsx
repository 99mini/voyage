import { cn } from '@packages/vds';

type UILayoutProps = {
  children: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
};

const UILayout = ({ children, position, className }: UILayoutProps) => {
  return <div className={cn(`absolute ${position}-0`, className)}>{children}</div>;
};

export default UILayout;
