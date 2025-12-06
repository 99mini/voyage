import { useRotarySwitch } from '../hooks/use-rotary-switch';
import { BaseRotarySwitchProps } from '../types/base-rotary-switch-props';

export const MinimalRotarySwitch = ({ steps = 12, initialValue = 0, onChange, size = 200 }: BaseRotarySwitchProps) => {
  const { currentStep, rotation, isDragging, knobRef, handlers } = useRotarySwitch({
    steps,
    initialValue,
    onChange,
  });

  return (
    <div className="flex flex-col items-center gap-5 p-10 select-none">
      <div
        ref={knobRef}
        onMouseDown={handlers.onMouseDown}
        onTouchStart={handlers.onTouchStart}
        className={`relative touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <svg width={size} height={size} className="absolute top-0 left-0">
          <defs>
            <linearGradient id="minimal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>

          {Array.from({ length: steps }).map((_, i) => {
            const angle = (i * 360) / steps;
            const isActive = i === currentStep;
            const dotRadius = isActive ? 6 : 4;
            const outerRadius = size / 2 - 20;

            const cx = size / 2 + outerRadius * Math.cos((angle - 90) * (Math.PI / 180));
            const cy = size / 2 + outerRadius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={dotRadius}
                fill={isActive ? '#3b82f6' : '#d1d5db'}
                className="transition-all duration-200"
              />
            );
          })}

          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 40}
            fill="url(#minimal-gradient)"
            stroke="#d1d5db"
            strokeWidth="2"
          />

          <g
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            style={{
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            <line
              x1={size / 2}
              y1={size / 2}
              x2={size / 2}
              y2={size / 2 - (size / 2 - 60)}
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          <circle cx={size / 2} cy={size / 2} r="12" fill="white" stroke="#3b82f6" strokeWidth="3" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl font-bold text-blue-500 tabular-nums">{currentStep}</div>
        <div className="text-sm text-gray-500">
          Position {currentStep} of {steps - 1}
        </div>
      </div>
    </div>
  );
};
