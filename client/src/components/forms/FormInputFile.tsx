import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface FormInputFileProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  accept?: string;
  type?: string;
  classInput?: string;
  onChange?: (file: File | null) => void;
}

const FormInputFile = ({ inputRef, form, name, accept, type = "file", classInput, onChange }: FormInputFileProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              ref={inputRef}
              accept={accept}
              type={type}
              className={classInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                field.onChange(e.target.files?.[0] || null);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputFile;
