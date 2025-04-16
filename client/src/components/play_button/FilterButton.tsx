import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const FilterButton = ({
  label,
  isActive = false,
  onClick,
}: FilterButtonProps) => {
  return (
    <Button
      className={cn(
        "h-fit rounded-full text-white px-3 py-[6px]",
        isActive ? "bg-white text-black pointer-events-none" : "bg-[#FFFFFF1A] hover:bg-[#FFFFFF2A]"
      )}
      onClick={onClick}
    >
      <span className="text-xs font-normal">{label}</span>
    </Button>
  );
};

export default FilterButton;
