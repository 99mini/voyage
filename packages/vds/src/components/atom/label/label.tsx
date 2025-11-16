import { Label as ShadcnLabel } from '@/components/ui/label';

export type LabelProps = React.ComponentProps<typeof ShadcnLabel>;

const Label = ({ className, ...props }: LabelProps) => {
  return <ShadcnLabel className={className} {...props} />;
};

export default Label;
