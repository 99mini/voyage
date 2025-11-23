import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import Input, { type InputProps } from '../input';

export type OtpInputRef = {
  getValue: () => string;
  reset: () => void;
  focus: () => void;
};

type OtpInputProps = {
  /**
   * Length of the OTP input fields
   * @default 6
   */
  length?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
} & Omit<InputProps, 'onChange'>;

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(({ length = 6, onChange, onComplete }, ref) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    getValue: () => values.join(''),
    reset: () => {
      setValues(Array(length).fill(''));
      inputRefs.current[0]?.focus();
    },
    focus: () => {
      inputRefs.current[0]?.focus();
    },
  }));

  const handleChange = (index: number, value: string) => {
    // Only allow single character
    const newValue = value.slice(-1);
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
    onChange?.(newValues.join(''));

    // Auto-focus next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (index === length - 1 && newValue) {
      const isComplete = newValues.every((v) => v !== '');
      if (isComplete) {
        onComplete?.(newValues.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const newValues = [...values];

    // Fill inputs from current position with pasted characters
    for (let i = 0; i < pastedData.length && index + i < length; i++) {
      newValues[index + i] = pastedData[i];
    }

    setValues(newValues);
    onChange?.(newValues.join(''));
    // Focus the next empty input or the last filled input
    const nextIndex = Math.min(index + pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center">
      {Array.from({ length }).map((_, index) => (
        <Input
          className="size-12 mx-1 text-center"
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          maxLength={1}
        />
      ))}
    </div>
  );
});

OtpInput.displayName = 'OtpInput';

export default OtpInput;
