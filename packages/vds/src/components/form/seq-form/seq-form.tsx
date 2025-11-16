import { forwardRef } from 'react';

export type SeqFormProps = {
  /**
   * @description 폼 내부에 렌더링할 입력 컴포넌트들의 배열입니다.
   * */
  InputComponents: Array<React.ReactNode>;
  /**
   * @description 폼 내부의 자식 컴포넌트(children)의 위치를 지정합니다.
   * - 'before': 입력 컴포넌트들 앞에 위치합니다.
   * - 'after': 입력 컴포넌트들 뒤에 위치합니다.
   * @default 'after'
   */
  childrenPosition?: 'before' | 'after';
} & React.FormHTMLAttributes<HTMLFormElement>;

/**
 * @description 접근성을 고려한 순차적 폼 컴포넌트
 * - 각 입력창이 유효할 때 다음 입력창으로 포커스가 이동합니다.
 * - 폼 제출 시 모든 입력창을 검증하고, 검증에 실패한 입력창으로 포커스가 이동합니다.
 * - 선행 입력창이 유효하지 않으면 다음 입력창이 비활성화/숨겨집니다.
 */
const SeqForm = forwardRef<HTMLFormElement, SeqFormProps>(
  ({ InputComponents, childrenPosition = 'after', ...props }, ref) => {
    const { children, onSubmit, ...restFormProps } = props;

    return (
      <form ref={ref} {...restFormProps} onSubmit={onSubmit}>
        {childrenPosition === 'before' && children}
        {InputComponents}
        {childrenPosition === 'after' && children}
      </form>
    );
  },
);

export default SeqForm;
