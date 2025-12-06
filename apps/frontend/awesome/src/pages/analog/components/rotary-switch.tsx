import { useCallback, useEffect, useRef, useState } from 'react';

interface RotarySwitchProps {
  steps?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  size?: number;
}

export const RotarySwitch = ({ steps = 12, initialValue = 0, onChange, size = 200 }: RotarySwitchProps) => {
  const [currentStep, setCurrentStep] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState((initialValue * 360) / steps);
  const knobRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const degreesPerStep = 360 / steps;

  const triggerHapticFeedback = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const snapToNearestStep = useCallback(
    (angle: number) => {
      const normalizedAngle = ((angle % 360) + 360) % 360;
      const step = Math.round(normalizedAngle / degreesPerStep);
      const snappedAngle = (step * degreesPerStep) % 360;
      const finalStep = step % steps;

      return { angle: snappedAngle, step: finalStep };
    },
    [degreesPerStep, steps],
  );

  const getAngleFromEvent = useCallback((clientX: number, clientY: number) => {
    if (!knobRef.current) return 0;

    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;

    return angle;
  }, []);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(true);
      lastAngleRef.current = getAngleFromEvent(clientX, clientY);
    },
    [getAngleFromEvent],
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const currentAngle = getAngleFromEvent(clientX, clientY);
      let delta = currentAngle - lastAngleRef.current;

      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      const newRotation = rotation + delta;
      lastAngleRef.current = currentAngle;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setRotation(newRotation);
      });
    },
    [isDragging, rotation, getAngleFromEvent],
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const { angle: snappedAngle, step } = snapToNearestStep(rotation);

    setRotation(snappedAngle);
    if (step !== currentStep) {
      setCurrentStep(step);
      triggerHapticFeedback();
      onChange?.(step);
    }
  }, [isDragging, rotation, currentStep, snapToNearestStep, triggerHapticFeedback, onChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '40px',
        userSelect: 'none',
      }}
    >
      <div
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
      >
        <svg
          width={size}
          height={size}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <defs>
            <radialGradient id="knob-gradient">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="70%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </radialGradient>
            <filter id="knob-shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {Array.from({ length: steps }).map((_, i) => {
            const angle = (i * 360) / steps;
            const isActive = i === currentStep;
            const tickLength = isActive ? 15 : 10;
            const tickWidth = isActive ? 3 : 2;
            const outerRadius = size / 2 - 10;
            const innerRadius = outerRadius - tickLength;

            const x1 = size / 2 + outerRadius * Math.cos((angle - 90) * (Math.PI / 180));
            const y1 = size / 2 + outerRadius * Math.sin((angle - 90) * (Math.PI / 180));
            const x2 = size / 2 + innerRadius * Math.cos((angle - 90) * (Math.PI / 180));
            const y2 = size / 2 + innerRadius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? '#3b82f6' : '#666'}
                strokeWidth={tickWidth}
                strokeLinecap="round"
              />
            );
          })}

          <circle cx={size / 2} cy={size / 2} r={size / 2 - 30} fill="url(#knob-gradient)" filter="url(#knob-shadow)" />

          <g
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            style={{
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            <line
              x1={size / 2}
              y1={size / 2 - (size / 2 - 50)}
              x2={size / 2}
              y2={size / 2 - (size / 2 - 80)}
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx={size / 2} cy={size / 2 - (size / 2 - 50)} r="6" fill="#3b82f6" />
          </g>

          <circle cx={size / 2} cy={size / 2} r="15" fill="#1a1a1a" />
          <circle cx={size / 2} cy={size / 2} r="8" fill="#333" />
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#3b82f6',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {currentStep}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#666',
          }}
        >
          Position {currentStep} of {steps - 1}
        </div>
      </div>
    </div>
  );
};
