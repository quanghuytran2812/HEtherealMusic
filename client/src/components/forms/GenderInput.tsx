/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { enumData } from "@/utils/contants";

interface GenderInputProps {
  form: any; // Replace with specific type as needed
  name: string;
  label?: string;
}

const GenderInput = ({ form, name, label }: GenderInputProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-bold text-sm flex flex-col">
          {label}
          <span className="text-[#818181] text-sm font-normal">
            Your gender helps us deliver relevant recommendations and ads to you.
          </span>
        </FormLabel>
        <FormControl>
          <RadioGroup
            className="pt-2"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            {enumData.gender.map((gender, index) => (
              <FormItem
                key={index}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem
                    className="border-[#7c7c7c]"
                    value={gender.value}
                  />
                </FormControl>
                <FormLabel className="font-normal">{gender.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default GenderInput;
