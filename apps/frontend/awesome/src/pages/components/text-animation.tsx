import { useState } from 'react';

import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';
import WheelText from '@/components/text-animation/wheel-text';

const TextAnimationSection = () => {
  const [text, setText] = useState('Hello World');
  const [delay, setDelay] = useState(50);
  const [duration, setDuration] = useState(500);
  const [steps, setSteps] = useState(10);
  const [direction, setDirection] = useState<'bottom-to-top' | 'top-to-bottom' | 'random'>('bottom-to-top');
  const [charGeneration, setCharGeneration] = useState<'sequential' | 'random'>('sequential');
  const [key, setKey] = useState(0);

  // 애니메이션 재시작 핸들러
  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  // 텍스트 변경 핸들러
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 지연 시간 변경 핸들러
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  // 지속 시간 변경 핸들러
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  // 단계 수 변경 핸들러
  const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(Number(e.target.value));
  };

  // 방향 변경 핸들러
  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDirection(e.target.value as 'bottom-to-top' | 'top-to-bottom' | 'random');
  };

  // 문자 생성 방식 변경 핸들러
  const handleCharGenerationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCharGeneration(e.target.value as 'sequential' | 'random');
  };

  return (
    <ThemeLayout title="텍스트 애니메이션">
      <ItemLayout title="휠 텍스트 (기본)" description="기본 설정의 휠 텍스트 애니메이션">
        <div className="flex items-center justify-center p-8">
          <WheelText text="Hello World" />
        </div>
      </ItemLayout>

      <ItemLayout title="휠 텍스트 (위에서 아래로)" description="위에서 아래로 휠되는 텍스트 애니메이션">
        <div className="flex items-center justify-center p-8">
          <WheelText text="Top to Bottom" direction="top-to-bottom" />
        </div>
      </ItemLayout>

      <ItemLayout title="휠 텍스트 (랜덤 방향)" description="각 문자마다 랜덤한 방향으로 휠되는 텍스트 애니메이션">
        <div className="flex items-center justify-center p-8">
          <WheelText text="Random Direction" direction="random" />
        </div>
      </ItemLayout>

      <ItemLayout title="휠 텍스트 (랜덤 문자)" description="랜덤 문자로 휠되는 텍스트 애니메이션">
        <div className="flex items-center justify-center p-8">
          <WheelText text="Random Characters" charGeneration="random" />
        </div>
      </ItemLayout>

      <ItemLayout title="휠 텍스트 (사용자 정의)" description="사용자가 설정을 변경할 수 있는 휠 텍스트 애니메이션">
        <div className="flex flex-col items-center justify-center p-8 gap-8">
          <div className="w-full max-w-xl">
            <WheelText
              key={key}
              text={text}
              delay={delay}
              duration={duration}
              steps={steps}
              direction={direction}
              charGeneration={charGeneration}
            />
          </div>

          <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="text" className="text-sm font-medium">
                텍스트
              </label>
              <input id="text" type="text" value={text} onChange={handleTextChange} className="border rounded-md p-2" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="delay" className="text-sm font-medium">
                지연 시간 (ms): {delay}
              </label>
              <input
                id="delay"
                type="range"
                min="0"
                max="200"
                value={delay}
                onChange={handleDelayChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="duration" className="text-sm font-medium">
                애니메이션 지속 시간 (ms): {duration}
              </label>
              <input
                id="duration"
                type="range"
                min="100"
                max="2000"
                value={duration}
                onChange={handleDurationChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="steps" className="text-sm font-medium">
                애니메이션 단계 수: {steps}
              </label>
              <input
                id="steps"
                type="range"
                min="1"
                max="10"
                value={steps}
                onChange={handleStepsChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="direction" className="text-sm font-medium">
                애니메이션 방향
              </label>
              <select
                id="direction"
                value={direction}
                onChange={handleDirectionChange}
                className="border rounded-md p-2"
              >
                <option value="bottom-to-top">아래에서 위로</option>
                <option value="top-to-bottom">위에서 아래로</option>
                <option value="random">랜덤</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="charGeneration" className="text-sm font-medium">
                문자 생성 방식
              </label>
              <select
                id="charGeneration"
                value={charGeneration}
                onChange={handleCharGenerationChange}
                className="border rounded-md p-2"
              >
                <option value="sequential">순차적</option>
                <option value="random">랜덤</option>
              </select>
            </div>

            <div className="flex items-end md:col-span-2">
              <button
                onClick={handleReset}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                애니메이션 재시작
              </button>
            </div>
          </div>
        </div>
      </ItemLayout>
    </ThemeLayout>
  );
};

export default TextAnimationSection;
