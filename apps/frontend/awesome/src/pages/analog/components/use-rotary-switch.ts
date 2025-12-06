import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseRotarySwitchProps {
  steps?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  enableHapticFeedback?: boolean;
}

export interface UseRotarySwitchReturn {
  currentStep: number;
  rotation: number;
  isDragging: boolean;
  knobRef: React.RefObject<HTMLDivElement>;
  handlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
  helpers: {
    getStepAngle: (step: number) => number;
    snapToNearestStep: (angle: number) => { angle: number; step: number };
  };
}

export const useRotarySwitch = ({
  steps = 12,
  initialValue = 0,
  onChange,
  enableHapticFeedback = true,
}: UseRotarySwitchProps = {}): UseRotarySwitchReturn => {
  const [currentStep, setCurrentStep] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState((initialValue * 360) / steps);
  const knobRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const startPosRef = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const degreesPerStep = 360 / steps;

  const triggerHapticFeedback = useCallback(() => {
    if (enableHapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [enableHapticFeedback]);

  const snapToNearestStep = useCallback(
    (angle: number, keepRotationCount = false) => {
      if (keepRotationCount) {
        // 회전 방향을 유지하면서 가장 가까운 step으로 스냅
        const step = Math.round(angle / degreesPerStep);
        const snappedAngle = step * degreesPerStep;
        const finalStep = ((step % steps) + steps) % steps;

        return { angle: snappedAngle, step: finalStep };
      } else {
        // 0-360 범위로 정규화
        const normalizedAngle = ((angle % 360) + 360) % 360;
        const step = Math.round(normalizedAngle / degreesPerStep);
        const snappedAngle = (step * degreesPerStep) % 360;
        const finalStep = step % steps;

        return { angle: snappedAngle, step: finalStep };
      }
    },
    [degreesPerStep, steps],
  );

  const getStepAngle = useCallback(
    (step: number) => {
      return (step * 360) / steps;
    },
    [steps],
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

  const handleClick = useCallback(
    (clientX: number, clientY: number) => {
      const clickAngle = getAngleFromEvent(clientX, clientY);
      const { angle: snappedAngle, step } = snapToNearestStep(clickAngle);

      setRotation(snappedAngle);
      if (step !== currentStep) {
        setCurrentStep(step);
        triggerHapticFeedback();
        onChange?.(step);
      }
    },
    [getAngleFromEvent, snapToNearestStep, currentStep, triggerHapticFeedback, onChange],
  );

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(true);
      startPosRef.current = { x: clientX, y: clientY };
      hasMoved.current = false;
      lastAngleRef.current = getAngleFromEvent(clientX, clientY);
    },
    [getAngleFromEvent],
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const dx = clientX - startPosRef.current.x;
      const dy = clientY - startPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        hasMoved.current = true;
      }

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

  const handleEnd = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      setIsDragging(false);

      if (!hasMoved.current) {
        handleClick(clientX, clientY);
        return;
      }

      // 드래그 방향을 유지하면서 가장 가까운 step으로 스냅
      const { angle: snappedAngle, step } = snapToNearestStep(rotation, true);

      setRotation(snappedAngle);
      if (step !== currentStep) {
        setCurrentStep(step);
        triggerHapticFeedback();
        onChange?.(step);
      }
    },
    [isDragging, rotation, currentStep, snapToNearestStep, triggerHapticFeedback, onChange, handleClick],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      handleEnd(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    },
    [handleStart],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [handleStart],
  );

  return {
    currentStep,
    rotation,
    isDragging,
    knobRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    },
    helpers: {
      getStepAngle,
      snapToNearestStep,
    },
  };
};
