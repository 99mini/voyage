export interface InputSchema {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
}

export interface AutoGenerateInputProps {}

const AutoGenerateInput = ({ ...args }: AutoGenerateInputProps) => {
  return <div>Input</div>;
};

export default AutoGenerateInput;
