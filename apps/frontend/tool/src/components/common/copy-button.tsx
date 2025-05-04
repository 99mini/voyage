import { useEffect, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@packages/vds';
import { Button } from '@packages/vds';

const style = {
  'animation-icon':
    'absolute inset-0 flex items-center justify-center transition-all duration-300 transition-transform',
  'animation-icon-idle': 'scale-100',
  'animation-icon-animating': 'scale-50',
  'animation-icon-copied': 'scale-100',
  icon: {
    small: '[&_svg]:size-3',
    icon: '[&_svg]:size-4',
    large: '[&_svg]:size-5',
  },
  'button-size': {
    small: 'size-6',
    icon: 'size-9',
    large: 'size-10',
  },
  'success-icon': 'text-green-500',
  'success-icon-border': 'border-green-500',
};

type CopyButtonProps = {
  value: string;
  onCopy?: () => void;
  className?: string;
  size?: 'icon' | 'small' | 'large';
  disabled?: boolean;
};

const CopyButton = ({ value, onCopy, className, size = 'icon', disabled }: CopyButtonProps) => {
  const [copied, setCopied] = useState<'idle' | 'animating' | 'copied'>('idle');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animTimerRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = (value: string, callback?: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (animTimerRef.current) {
      clearTimeout(animTimerRef.current);
    }
    setCopied('animating');
    navigator.clipboard.writeText(value);
    callback?.();
    animTimerRef.current = setTimeout(() => {
      setCopied('copied');
      timerRef.current = setTimeout(() => setCopied('idle'), 3000);
    }, 237);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'relative',
        style['button-size'][size],
        copied === 'copied' && style['success-icon-border'],
        className,
      )}
      onClick={() => copyToClipboard(value, onCopy)}
      title="클립보드에 복사"
      disabled={disabled}
    >
      <span
        className={cn(
          style['animation-icon'],
          style[`animation-icon-${copied}`],
          copied === 'copied' ? 'opacity-0' : 'opacity-100',
          style['icon'][size],
        )}
      >
        <Copy />
      </span>
      <span
        className={cn(
          style['animation-icon'],
          copied === 'copied' ? style['animation-icon-copied'] : style['animation-icon-idle'],
          copied === 'copied' ? 'opacity-100' : 'opacity-0',
          style['icon'][size],
        )}
      >
        <Check className={cn(style['success-icon'])} />
      </span>
      <span className="sr-only">{copied === 'copied' ? '복사됨' : '복사'}</span>
    </Button>
  );
};

export default CopyButton;
