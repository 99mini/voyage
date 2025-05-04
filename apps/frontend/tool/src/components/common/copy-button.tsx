import { useEffect, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@packages/vds';
import { Button } from '@packages/vds';

const style = {
  'animation-icon': 'absolute inset-0 flex items-center justify-center transition-all duration-300',
  'animation-icon-copied': 'opacity-0',
  'animation-icon-not-copied': 'opacity-100',
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
};

const CopyButton = ({ value, onCopy, className, size = 'icon' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = (value: string, callback?: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setCopied(true);

    navigator.clipboard.writeText(value);

    callback?.();

    timerRef.current = setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('relative', style['button-size'][size], copied && style['success-icon-border'], className)}
      onClick={() => copyToClipboard(value, onCopy)}
      title="클립보드에 복사"
    >
      <span
        className={cn(
          style['animation-icon'],
          style[`animation-icon-${copied ? 'copied' : 'not-copied'}`],
          style['icon'][size],
        )}
      >
        <Copy />
      </span>
      <span
        className={cn(
          style['animation-icon'],
          style[`animation-icon-${!copied ? 'copied' : 'not-copied'}`],
          style['icon'][size],
        )}
      >
        <Check className={cn(style['success-icon'])} />
      </span>
      <span className="sr-only">{copied ? '복사됨' : '복사'}</span>
    </Button>
  );
};

export default CopyButton;
