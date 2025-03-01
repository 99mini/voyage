import { Checkbox, Label } from '@packages/vds';

type OptionCheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  label?: string;
};

const OptionCheckbox = ({ checked, onCheckedChange, id, label }: OptionCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      {id && label && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
};

export default OptionCheckbox;
