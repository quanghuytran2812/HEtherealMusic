import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface DateOfBirthInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  label?: string;
}
const DateOfBirthInput = ({ form, label }: DateOfBirthInputProps) => {
  return (
    <FormItem>
      <FormLabel className="font-bold text-sm flex flex-col">
        {label}
        <span className="text-[#818181] text-sm font-normal">
          Tại sao chúng tôi cần biết ngày sinh của bạn?
          <a
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.spotify.com/legal/end-user-agreement/"
          >
            Tìm hiểu thêm.
          </a>
        </span>
      </FormLabel>
      <div className="flex flex-row gap-2">
        <FormField
          name="dob.day"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <Input
                type="number"
                placeholder="dd"
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="text-white w-1/3 h-12 text-base font-normal p-3 bg-transparent border border-gray-400 placeholder:text-[#818181] placeholder:text-base placeholder:font-medium hover:border-white"
              />
            </FormControl>
          )}
        />
        <FormField
          name="dob.month"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString() || ""}
              >
                <SelectTrigger className="w-[180px] h-12 text-base font-normal p-3 bg-transparent border border-gray-400 text-white hover:border-white">
                  <SelectValue placeholder="Tháng" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-400 text-white">
                  {[...Array(12)].map((_, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()}>
                      {`Tháng ${index + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />
        <FormField
          name="dob.year"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <Input
                type="number"
                placeholder="yyyy"
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="text-white w-1/2 h-12 text-base font-normal p-3 bg-transparent border border-gray-400 placeholder:text-[#818181] placeholder:text-base placeholder:font-medium hover:border-white"
              />
            </FormControl>
          )}
        />
      </div>
      <FormMessage>
        {form.formState.errors.dob?.day?.message ||
          form.formState.errors.dob?.month?.message ||
          form.formState.errors.dob?.year?.message ||
          form.formState.errors.dob?.root?.message}
      </FormMessage>
    </FormItem>
  );
};

export default DateOfBirthInput;
