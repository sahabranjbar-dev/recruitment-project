export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "onChange"
  > {
  name: string;
  onChange?: (data: any) => void;
}
