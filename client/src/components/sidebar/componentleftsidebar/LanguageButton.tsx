import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageButton = () => {
  return (
    <div className="mb-8 px-6">
      <Button className="font-bold text-sm border border-[#7c7c7c] rounded-2xl text-white py-1 hover:scale-105 hover:border-white transition-all">
        <span className="flex">
          <Globe size={16} />
        </span>
        English
      </Button>
    </div>
  );
};

export default LanguageButton;
