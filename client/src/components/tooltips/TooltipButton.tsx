import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TooltipButtonProps {
  tooltipContent: string;
  icon?: React.ReactNode; // Adjust based on your button variants
  href?: string;
  className?: string;
  classLink?: string;
  sizeButton?: "default" | "icon" | "lg" | "sm";
  title?: string;
  onClick?: () => void;
}

const TooltipButton = React.forwardRef<HTMLButtonElement, TooltipButtonProps>(({
  tooltipContent,
  icon,
  href,
  className,
  classLink,
  sizeButton,
  title,
  onClick
}, ref) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={sizeButton} onClick={onClick} className={className} ref={ref}>
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
        <TooltipContent className="bg-[#1f1f1f]">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

TooltipButton.displayName = 'TooltipButton'; // Set a display name for debugging

export default TooltipButton;