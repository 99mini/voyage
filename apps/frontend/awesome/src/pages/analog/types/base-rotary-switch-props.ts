export interface BaseRotarySwitchProps {
  steps?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  size?: number;
}
