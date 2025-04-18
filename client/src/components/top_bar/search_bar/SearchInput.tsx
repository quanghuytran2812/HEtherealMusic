import { X } from "lucide-react";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { cn } from "@/lib/utils";
import { body_large, input, search_field } from "@/lib/classname";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}
const SearchInput = ({ value, onChange, onClear }: SearchInputProps) => (
  <form
    role="search"
    className="search_form flex-grow"
    onSubmit={(e) => e.preventDefault()}
  >
    <label htmlFor="search-input" className="sr-only">
      What do you want to listen to?
    </label>
    <div className="relative h-12">
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="What do you want to listen to?"
        className={cn(body_large, input, search_field, "search_field")}
        aria-label="Search for music"
        required
      />
      {value && (
        <IconButton
          icon={<X />}
          variant="clear"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2"
          aria-label="Clear search"
        />
      )}
    </div>
  </form>
);

export default SearchInput;
