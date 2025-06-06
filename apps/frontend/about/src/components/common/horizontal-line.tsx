import { cn } from '@packages/vds';

export interface HorizontalLineProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}

const HorizontalLine = ({ className, ...props }: HorizontalLineProps) => (
  <hr className={cn('my-4', className)} {...props} />
);

export default HorizontalLine;
