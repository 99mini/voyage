import { Fragment, forwardRef, useRef, useState } from 'react';

/**
 * @description SeqForm에서 각 입력 필드를 정의하는 설정 타입
 */
export type SeqFormInputConfig = {
  /**
   * @description 입력 필드의 고유 식별자
   */
  name: string;
  /**
   * @description validation 통과 시 자동으로 다음 입력으로 포커스 이동 여부
   * - true: validation 통과 즉시 자동 포커스 이동 (예: 생년월일 6글자, 인증번호 등)
   * - false: Enter/Tab 키로만 이동 (기본값) - 사용자가 원하는 만큼 입력 가능
   * @default false
   */
  autoFocusOnValid?: boolean;
  /**
   * @description 입력 컴포넌트를 렌더링하는 함수
   * @param props.ref - Input 컴포넌트에 전달할 ref
   * @param props.onValidationChange - validation 상태 변경 시 호출되는 콜백
   * @param props.disabled - 순차적 입력에 의해 비활성화 여부
   */
  render: (props: {
    ref: React.RefObject<HTMLInputElement>;
    onValidationChange: (isValid: boolean) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }) => React.ReactNode;
};

export type SeqFormProps = {
  /**
   * @description 폼 내부에 렌더링할 입력 필드 설정 배열
   * */
  inputs: SeqFormInputConfig[];
  /**
   * @description 폼 내부의 자식 컴포넌트(children)의 위치를 지정합니다.
   * - 'before': 입력 컴포넌트들 앞에 위치합니다.
   * - 'after': 입력 컴포넌트들 뒤에 위치합니다.
   * @default 'after'
   */
  childrenPosition?: 'before' | 'after';
  /**
   * @description 순차적 입력 모드 활성화 여부
   * - true: 이전 입력이 유효할 때만 다음 입력이 표시/활성화됩니다.
   * - false: 모든 입력이 항상 표시됩니다.
   * @default true
   */
  sequential?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>;

/**
 * @description 접근성을 고려한 순차적 폼 컴포넌트
 * - 각 입력창이 유효할 때 다음 입력창이 표시/활성화됩니다.
 * - 폼 제출 시 모든 입력창을 검증하고, 검증에 실패한 입력창으로 포커스가 이동합니다.
 * - 선행 입력창이 유효하지 않으면 다음 입력창이 비활성화/숨겨집니다.
 */
const SeqForm = forwardRef<HTMLFormElement, SeqFormProps>(
  ({ inputs, childrenPosition = 'after', sequential = true, ...props }, ref) => {
    const { children, onSubmit, ...restFormProps } = props;

    const inputLength = inputs.length;

    // 각 input의 ref를 관리
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(inputs.map(() => ({ current: null })));

    // 각 input의 validation 상태를 관리
    const [validationStates, setValidationStates] = useState<boolean[]>(inputs.map(() => false));

    // 특정 input의 validation 상태를 업데이트
    const handleValidationChange = (index: number) => (isValid: boolean) => {
      setValidationStates((prev) => {
        const next = [...prev];
        next[index] = isValid;
        return next;
      });

      // autoFocusOnValid가 true일 때만 자동으로 다음 input으로 포커스 이동
      const currentInput = inputs[index];
      if (sequential && isValid && currentInput.autoFocusOnValid && index < inputs.length - 1) {
        const nextRef = inputRefs.current[index + 1];
        if (nextRef?.current) {
          setTimeout(() => {
            nextRef.current?.focus();
          }, 100); // 사용자가 입력을 완료할 시간 제공
        }
      }
    };

    // 다음 input으로 포커스 이동하는 함수
    const focusNextInput = (currentIndex: number) => {
      if (currentIndex < inputs.length - 1) {
        const nextRef = inputRefs.current[currentIndex + 1];
        if (nextRef?.current) {
          nextRef.current.focus();
        }
      }
    };

    // Enter 키 핸들러
    const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (index === inputs.length - 1) return; // 마지막 input이면 무시

      if (e.key === 'Enter') {
        e.preventDefault(); // 폼 제출 방지

        const currentRef = inputRefs.current[index];
        const isValid = currentRef?.current ? currentRef.current.checkValidity() : false;

        // 현재 입력이 유효하면 다음으로 이동, 아니면 현재 위치 유지
        if (sequential && isValid) {
          focusNextInput(index);
        }
      }
    };

    // 폼 제출 핸들러
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 모든 input validation 체크
      let firstInvalidIndex = -1;
      inputRefs.current.forEach((ref, index) => {
        if (ref.current && !ref.current.checkValidity() && firstInvalidIndex === -1) {
          firstInvalidIndex = index;
        }
      });

      // 첫 번째 invalid input으로 포커스 이동
      if (firstInvalidIndex !== -1) {
        inputRefs.current[firstInvalidIndex]?.current?.focus();
        return;
      }

      onSubmit?.(e);
    };

    // 각 input이 표시되어야 하는지 결정
    const shouldShowInput = (index: number): boolean => {
      if (!sequential) return true;
      if (index === 0) return true;
      // 이전 모든 input이 유효할 때만 표시
      return validationStates.slice(0, index).every((isValid) => isValid);
    };

    return (
      <form ref={ref} {...restFormProps} onSubmit={handleSubmit}>
        {childrenPosition === 'before' && children}
        {inputs.map((input, index) => {
          if (!shouldShowInput(index)) return null;

          return (
            <Fragment key={input.name}>
              {input.render({
                ref: inputRefs.current[index],
                onValidationChange: handleValidationChange(index),
                onKeyDown: handleKeyDown(index),
                disabled: sequential && index > 0 && !validationStates[index - 1],
              })}
            </Fragment>
          );
        })}
        {childrenPosition === 'after' && children}
      </form>
    );
  },
);

SeqForm.displayName = 'SeqForm';

export default SeqForm;
