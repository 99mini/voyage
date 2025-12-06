import { useRotarySwitch } from '../hooks/use-rotary-switch';

interface RealisticRotarySwitchProps {
  steps?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  size?: number;
}

export const RealisticRotarySwitch = ({
  steps = 10,
  initialValue = 0,
  onChange,
  size = 250,
}: RealisticRotarySwitchProps) => {
  const { currentStep, rotation, isDragging, knobRef, handlers } = useRotarySwitch({
    steps,
    initialValue,
    onChange,
  });

  const knobSize = size * 0.45;
  const baseSize = size * 0.9;

  return (
    <div className="flex flex-col items-center gap-8 p-10 select-none">
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Base plate with scale */}
        <div
          className="absolute"
          style={{
            width: `${baseSize}px`,
            height: `${baseSize}px`,
            left: `${(size - baseSize) / 2}px`,
            top: `${(size - baseSize) / 2}px`,
          }}
        >
          <svg width={baseSize} height={baseSize}>
            {/* Base circle */}
            <circle cx={baseSize / 2} cy={baseSize / 2} r={baseSize / 2 - 4} fill="#a1a1aa" />

            {/* Inner ring */}
            <circle
              cx={baseSize / 2}
              cy={baseSize / 2}
              r={baseSize / 2 - 8}
              fill="none"
              stroke="#71717a"
              strokeWidth="1"
            />

            {/* Scale marks and numbers */}
            {Array.from({ length: steps }).map((_, i) => {
              const angle = (i * 360) / steps;
              const isActive = i === currentStep;
              const outerRadius = baseSize / 2 - 10;
              const innerRadius = baseSize / 2 - 22;
              const numberRadius = baseSize / 2 - 35;

              const x1 = baseSize / 2 + outerRadius * Math.cos((angle - 90) * (Math.PI / 180));
              const y1 = baseSize / 2 + outerRadius * Math.sin((angle - 90) * (Math.PI / 180));
              const x2 = baseSize / 2 + innerRadius * Math.cos((angle - 90) * (Math.PI / 180));
              const y2 = baseSize / 2 + innerRadius * Math.sin((angle - 90) * (Math.PI / 180));

              const numX = baseSize / 2 + numberRadius * Math.cos((angle - 90) * (Math.PI / 180));
              const numY = baseSize / 2 + numberRadius * Math.sin((angle - 90) * (Math.PI / 180));

              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isActive ? '#3b82f6' : '#27272a'}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeLinecap="round"
                  />
                  <text
                    x={numX}
                    y={numY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight={isActive ? 'bold' : 'normal'}
                    fill={isActive ? '#3b82f6' : '#3f3f46'}
                    style={{ userSelect: 'none' }}
                  >
                    {i}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Knob */}
        <div
          ref={knobRef}
          onMouseDown={handlers.onMouseDown}
          onTouchStart={handlers.onTouchStart}
          className={`absolute touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            width: `${knobSize}px`,
            height: `${knobSize}px`,
            left: `${(size - knobSize) / 2}px`,
            top: `${(size - knobSize) / 2}px`,
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <svg width={knobSize} height={knobSize}>
            {/* Knob base (black) */}
            <circle cx={knobSize / 2} cy={knobSize / 2} r={knobSize / 2} fill="#f2f2f2" />

            {/* Ridges on the side */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const outerR = knobSize / 2 - 2;
              const innerR = knobSize / 2 - 8;

              const x1 = knobSize / 2 + outerR * Math.cos((angle - 90) * (Math.PI / 180));
              const y1 = knobSize / 2 + outerR * Math.sin((angle - 90) * (Math.PI / 180));
              const x2 = knobSize / 2 + innerR * Math.cos((angle - 90) * (Math.PI / 180));
              const y2 = knobSize / 2 + innerR * Math.sin((angle - 90) * (Math.PI / 180));

              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#18181b" strokeWidth="1.5" />;
            })}

            {/* Top metal cap */}
            <circle cx={knobSize / 2} cy={knobSize / 2} r={knobSize / 2 - 15} fill="#e4e4e7" />

            {/* Metal cap ring */}
            <circle
              cx={knobSize / 2}
              cy={knobSize / 2}
              r={knobSize / 2 - 15}
              fill="none"
              stroke="#a1a1aa"
              strokeWidth="2"
            />

            {/* Center indicator line */}
            <line
              x1={knobSize / 2}
              y1={knobSize / 2 - (knobSize / 2 - 25)}
              x2={knobSize / 2}
              y2={knobSize / 2 - (knobSize / 2 - 45)}
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Center dot */}
            <circle cx={knobSize / 2} cy={knobSize / 2} r="4" fill="#71717a" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-4xl font-bold text-blue-500 tabular-nums">{currentStep}</div>
        <div className="text-sm text-gray-500 font-medium">Position {currentStep}</div>
      </div>
    </div>
  );
};
