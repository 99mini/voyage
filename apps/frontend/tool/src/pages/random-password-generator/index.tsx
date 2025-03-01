import { Check, Copy } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button, Input, Label, Slider, useToast } from '@packages/vds';

import Description from '@/components/common/description';
import RootLayout from '@/components/layout/root-layout';

import OptionCheckbox from './components/option-checkbox';

import { PAGE_TITLE } from '@/lib/constant';

const RandomPasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = '';
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSpecialChars) chars += specialChars;

    // 선택된 문자 집합이 없는 경우 기본값으로 소문자 사용
    if (chars.length === 0) {
      chars = lowercase;
      setIncludeLowercase(true);
    }

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  }, [includeLowercase, includeNumbers, includeSpecialChars, includeUppercase, passwordLength]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast({
      description: '클립보드에 비밀번호를 복사했어요.',
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 3000);
  };

  // 컴포넌트 마운트 시와 옵션 변경 시 비밀번호 생성
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <RootLayout title={PAGE_TITLE.RANDOM_PASSWORD_GENERATOR}>
      <Description>{'비밀번호 길이와 포함할 문자 유형을 선택하세요'}</Description>
      <div className="w-full max-w-2xl mx-auto space-y-6 py-4">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Input value={password} readOnly className="flex-1 font-mono text-lg" />
            <Button
              variant="outline"
              size="icon"
              className={copied ? 'border-green-500' : ''}
              onClick={copyToClipboard}
              title="클립보드에 복사"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length">비밀번호 길이: {passwordLength}</Label>
            </div>
            <Slider
              id="length"
              min={4}
              max={64}
              step={1}
              value={[passwordLength]}
              onValueChange={(value) => setPasswordLength(value[0])}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OptionCheckbox
              id="uppercase"
              label="영문 대문자 포함"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
            />
            <OptionCheckbox
              id="lowercase"
              label="영문 소문자 포함"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
            />
            <OptionCheckbox
              id="numbers"
              label="숫자 포함"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
            />
            <OptionCheckbox
              id="specialChars"
              label="특수문자 포함"
              checked={includeSpecialChars}
              onCheckedChange={(checked) => setIncludeSpecialChars(checked as boolean)}
            />
          </div>
        </div>
        <div>
          <Button onClick={generatePassword} className="w-full">
            새로운 비밀번호 생성
          </Button>
        </div>
      </div>
    </RootLayout>
  );
};

export default RandomPasswordGenerator;
