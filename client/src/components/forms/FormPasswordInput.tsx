import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import PasswordValidation from "./PasswordValidation";
interface FormPasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  onErrorMessage?: boolean;
}
const FormPasswordInput = ({
  form,
  label,
  name,
  placeholder,
  onErrorMessage,
}: FormPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const password = form.watch(name);

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-bold text-sm flex flex-col">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="h-12 text-base font-normal p-3 bg-transparent border border-gray-400 placeholder:text-[#818181] placeholder:text-base placeholder:font-medium hover:border-white"
                placeholder={placeholder}
                {...field}
              />
              <Button
                type="button"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>
          {onErrorMessage ? (
            <FormMessage />
          ) : (
            <PasswordValidation
              password={password}
              isErrors={form.formState.errors.password ? true : false}
            />
          )}
        </FormItem>
      )}
    />
  );
};

export default FormPasswordInput;
