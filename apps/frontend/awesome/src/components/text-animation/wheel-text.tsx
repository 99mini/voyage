import { useEffect, useMemo, useRef, useState } from 'react';

type WheelTextProps = {
  text: string;
  /**
   * 애니메이션 지연 시간 (ms) - 기본값: 50ms
   */
  delay?: number;
  /**
   * 애니메이션 지속 시간 (ms) - 기본값: 500ms
   */
  duration?: number;
  /**
   * 휠 애니메이션 단계 수 - 기본값: 10
   */
  steps?: number;
  /**
   * 애니메이션 방향 - 기본값: 'bottom-to-top'
   */
  direction?: 'bottom-to-top' | 'top-to-bottom' | 'random';
  /**
   * 문자 생성 방식 - 기본값: 'sequential'
   */
  charGeneration?: 'sequential' | 'random';
};

const WheelText = ({
  text,
  delay = 50,
  duration = 500,
  steps = 10,
  direction = 'bottom-to-top',
  charGeneration = 'sequential',
}: WheelTextProps) => {
  const textArray = useMemo(() => text.split(''), [text]);
  const [animationComplete, setAnimationComplete] = useState<boolean[]>(new Array(textArray.length).fill(false));
  const animationRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 최대 단계 수 제한
  const limitedSteps = Math.min(10, steps);

  // 각 문자에 대한 애니메이션 문자 배열 생성
  const generateWheelChars = useMemo(() => {
    return textArray.map((char) => {
      // 알파벳인 경우
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const startCode = isUpperCase ? 65 : 97; // A 또는 a의 ASCII 코드
        const charCode = char.charCodeAt(0);
        const offset = charCode - startCode;

        if (charGeneration === 'sequential') {
          // 알파벳 순서대로 애니메이션 문자 생성
          return Array.from({ length: limitedSteps }, (_, i) => {
            const code = startCode + ((offset + i) % 26);
            return String.fromCharCode(code);
          });
        } else {
          // 랜덤 알파벳 생성 (렌더링마다 변경되지 않도록 인덱스 기반으로 생성)
          return Array.from({ length: limitedSteps }, (_, i) => {
            // 의사 랜덤 생성 (일관성 유지)
            const randomOffset = (offset + i * 7) % 26;
            return String.fromCharCode(startCode + randomOffset);
          });
        }
      }
      // 숫자인 경우
      else if (/[0-9]/.test(char)) {
        const digit = parseInt(char, 10);

        if (charGeneration === 'sequential') {
          // 숫자 순서대로 애니메이션 문자 생성
          return Array.from({ length: limitedSteps }, (_, i) => {
            return String((digit + i) % 10);
          });
        } else {
          // 랜덤 숫자 생성 (렌더링마다 변경되지 않도록 인덱스 기반으로 생성)
          return Array.from({ length: limitedSteps }, (_, i) => {
            // 의사 랜덤 생성 (일관성 유지)
            return String((digit + i * 3) % 10);
          });
        }
      }
      // 기타 문자인 경우 (공백 포함)
      else {
        return Array(limitedSteps).fill(char);
      }
    });
  }, [textArray, limitedSteps, charGeneration]);

  // 애니메이션 초기화 및 완료 처리
  useEffect(() => {
    setAnimationComplete(new Array(textArray.length).fill(false));

    const timers = textArray.map((_, index) => {
      return setTimeout(
        () => {
          setAnimationComplete((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        },
        delay * index + duration,
      );
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [textArray, delay, duration]);

  // 애니메이션 방향에 따른 스타일 설정
  const getAnimationStyle = (index: number) => {
    switch (direction) {
      case 'bottom-to-top':
        return {
          flexDirection: 'column' as const,
          animationName: 'wheelText',
        };
      case 'top-to-bottom':
        return {
          flexDirection: 'column-reverse' as const,
          animationName: 'wheelText',
        };
      case 'random':
        // 각 문자의 인덱스를 기반으로 방향 결정 (렌더링마다 변경되지 않도록)
        return {
          flexDirection: index % 2 === 0 ? ('column' as const) : ('column-reverse' as const),
          animationName: 'wheelText',
        };
      default:
        return {
          flexDirection: 'column' as const,
          animationName: 'wheelText',
        };
    }
  };

  return (
    <div className="flex gap-4 justify-center items-center w-full">
      {textArray.map((char, index) => {
        // 공백 문자는 특별히 처리
        if (char === ' ') {
          return <div key={index} className="w-4" />;
        }

        const animationStyle = getAnimationStyle(index);

        return (
          <div key={index} className="relative h-8 overflow-hidden">
            {animationComplete[index] ? (
              <span className="text-2xl font-bold">{char}</span>
            ) : (
              <div
                ref={(el) => (animationRefs.current[index] = el)}
                className="absolute inset-0"
                style={{
                  animation: `${animationStyle.animationName} ${duration}ms ease-out forwards`,
                  animationDelay: `${delay * index}ms`,
                  display: 'flex',
                  flexDirection: animationStyle.flexDirection,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                {/* 최대 10개의 문자만 렌더링하여 깊이 제한 */}
                {generateWheelChars[index].map((wheelChar, charIndex) => (
                  <div
                    key={charIndex}
                    className="text-2xl font-bold"
                    style={{
                      height: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 1 - charIndex * (1 / limitedSteps),
                    }}
                  >
                    {wheelChar}
                  </div>
                ))}
                <div
                  className="text-2xl font-bold"
                  style={{
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {char}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WheelText;
