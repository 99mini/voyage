import { useRotarySwitch } from '../hooks/use-rotary-switch';
import { BaseRotarySwitchProps } from '../types/base-rotary-switch-props';

export const RotarySwitch = ({ steps = 12, initialValue = 0, onChange, size = 200 }: BaseRotarySwitchProps) => {
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

      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl font-bold text-blue-500 tabular-nums">{currentStep}</div>
        <div className="text-sm text-gray-500">
          Position {currentStep} of {steps - 1}
        </div>
      </div>
    </div>
  );
};
