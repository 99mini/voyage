import { useEffect, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { Button } from '@packages/vds';

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
      className={copied ? 'border-green-500' : ''}
      onClick={() => copyToClipboard(value, onCopy)}
      title="클립보드에 복사"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

export default CopyButton;
