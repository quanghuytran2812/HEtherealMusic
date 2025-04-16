/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsAndConditionsProps {
  form: any; // Replace 'any' with your specific form type if available
  name: string;
}

interface Item {
  id: string;
  label: string;
}

const itemsData: Item[] = [
  {
    id: "1",
    label: "I do not want to receive marketing messages from HEthereal",
  },
  {
    id: "2",
    label:
      "Share my subscription data with HEthereal content providers for marketing purposes.",
  },
];

const TermsAndConditions = ({
  form,
  name,
}: TermsAndConditionsProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {itemsData.map((item) => (
          <FormItem
            key={item.id}
            className="flex flex-row items-start space-x-3 space-y-0 bg-[#ffffff1a] rounded py-4 pl-4"
          >
            <FormControl>
              <Checkbox
                className="border-[#7c7c7c]"
                checked={field.value?.includes(item.id)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                        field.value?.filter((value: string) => value !== item.id)
                      );
                }}
              />
            </FormControl>
            <FormLabel className="font-normal leading-4">
              {item.label}
            </FormLabel>
          </FormItem>
        ))}
        <FormMessage />
        <div>
          <p className="text-sm font-normal text-white">
            By clicking the Sign Up button, you agree to the
            <a
              className="text-[#1ed760] underline px-1"
              href="https://www.spotify.com/vn-vi/legal/end-user-agreement/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HEthereal Terms and Conditions of Use.
            </a>
          </p>
          <p className="text-sm font-normal text-white mt-2">
            <span>
            To learn more about how Ethereal collects, uses, shares and protects your personal data, please see
              <a
                className="text-[#1ed760] underline pl-1"
                href="https://www.spotify.com/vn-vi/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                HEthereal Privacy Policy
              </a>
            </span>
          </p>
        </div>
      </FormItem>
    )}
  />
);

export default TermsAndConditions;