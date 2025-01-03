import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipButtonProps {
  tooltipContent: string;
  icon?: React.ReactNode; // Adjust based on your button variants
  href?: string;
  className?: string;
  classLink?: string;
  sizeButton?: "default" | "icon" | "lg" | "sm";
  title?: string;
}
const TooltipButton = ({
  tooltipContent,
  icon,
  href,
  className,
  classLink,
  sizeButton,
  title,
}: TooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={sizeButton} className={className}>
            {href ? (
              <a className={classLink} href={href}>
                {icon}
              </a>
            ) : (
              <span className={classLink}>{icon}</span>
            )}
            {title}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
