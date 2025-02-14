import { Label as ShadcnLabel } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type LabelProps = React.ComponentProps<typeof ShadcnLabel>;

const Label = ({ className, ...props }: LabelProps) => {
  return <ShadcnLabel className={cn('py-10', className)} {...props} />;
};

export default Label;
