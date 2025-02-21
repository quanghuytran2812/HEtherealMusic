/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  form: any;
  name: string;
  options: Option[];
  isMulti?: boolean; // Optional for multi-select
  classSelect?: string; // Additional classes for styling
}

const FormSelect: React.FC<FormSelectProps> = ({ form, name, options, isMulti, classSelect }) => {
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <Select
            onValueChange={(value) => {
              if (isMulti) {
                const currentValues = field.value || [];
                const newValue = currentValues.includes(value)
                  ? currentValues.filter((v: string) => v !== value)
                  : [...currentValues, value];
                field.onChange(newValue);
              } else {
                field.onChange(value);
              }
            }}
            value={isMulti ? field.value?.[0] : field.value} // Default value for single select
          >
            <SelectTrigger className={classSelect}>
              <SelectValue placeholder={`Select ${name}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        <FormMessage />
      </FormItem>
    )}
  />
  );
};

export default FormSelect;