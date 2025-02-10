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
  desc?: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const FormInput = ({
  form,
  label,
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
              className="h-12 text-base font-normal p-3 bg-transparent border border-gray-400 placeholder:text-[#818181] placeholder:text-base placeholder:font-medium hover:border-white"
              placeholder={placeholder}
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