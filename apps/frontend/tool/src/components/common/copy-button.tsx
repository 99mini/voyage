import { useEffect, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@packages/vds';
import { Button } from '@packages/vds';

const style = {
  'animation-icon': 'absolute inset-0 flex items-center justify-center transition-all duration-300',
  'animation-icon-copied': 'opacity-0 scale-90',
  'animation-icon-not-copied': 'opacity-100 scale-100',
  icon: 'h-4 w-4',
};

type CopyButtonProps = {
  value: string;
  onCopy?: () => void;
};

const CopyButton = ({ value, onCopy }: CopyButtonProps) => {
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
      className={cn('relative', copied && 'border-green-500')}
      onClick={() => copyToClipboard(value, onCopy)}
      title="클립보드에 복사"
    >
      <span className={cn(style['animation-icon'], style[`animation-icon-${copied ? 'copied' : 'not-copied'}`])}>
        <Copy className={style['icon']} />
      </span>
      <span className={cn(style['animation-icon'], style[`animation-icon-${!copied ? 'copied' : 'not-copied'}`])}>
        <Check className={cn(style['icon'], 'text-green-500')} />
      </span>
      <span className="sr-only">{copied ? '복사됨' : '복사'}</span>
    </Button>
  );
};

export default CopyButton;
