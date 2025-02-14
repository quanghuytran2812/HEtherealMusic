import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputFileProps {
  inputRef: React.RefObject<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  accept?: string;
  type?: string;
  classInput?: string;
}

const FormInputFile = ({ inputRef, form, name, accept, type = "file", classInput }: FormInputFileProps) => {
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
              // Omit the value prop for file input
              onChange={(e) =>
                field.onChange(e.target.files ? e.target.files[0] : null)
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputFile;
