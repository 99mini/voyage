import { Label as ShadcnLabel } from '@/components/ui/label';
import { PropsOf } from '@emotion/react';

export interface LabelProps extends PropsOf<typeof ShadcnLabel> {}

const Label = (props: LabelProps) => {
  return <ShadcnLabel {...props} />;
};

export default Label;
