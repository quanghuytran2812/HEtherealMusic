import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  label?: string;
  classInput?: string;
  desc?: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const FormInput = ({
  form,
  label,
  classInput,
  desc,
  name,
  type = "text",
  placeholder
}: FormInputProps) => {

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-bold text-sm flex flex-col">
              {label}
              {desc && (
                <span className="text-[#818181] text-sm font-normal">
                  {desc}
                </span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              className={classInput}
              placeholder={placeholder}
              autoComplete="off"
              {...field}
            />
          </FormControl>
          <FormMessage />        
        </FormItem>
      )}
    />
  );
};

export default FormInput;