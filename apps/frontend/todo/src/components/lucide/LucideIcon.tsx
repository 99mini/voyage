import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';
import { HTMLAttributes } from 'react';

export interface LucideIconProps extends Omit<HTMLAttributes<HTMLOrSVGElement>, 'children'> {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}

const LucideIcon = ({ name, color = 'gray9', size = 16, ...props }: LucideIconProps) => {
  const SelectLucideIcon = icons[name];

  const isClickEvent = !!props.onClick;
  const pointerStyle = isClickEvent ? 'cursor-pointer' : '';

  return <SelectLucideIcon color={color} size={size} className={cn(pointerStyle, props.className)} {...props} />;
};

export default LucideIcon;
