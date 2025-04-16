import { Button } from "@/components/ui/button";
import { icon_btn } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: string;
  onClick?: () => void;
  href?: string;
  classSpan? : string
}
const IconButton = ({
  icon,
  variant,
  onClick,
  href,
  classSpan,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      className={cn(icon_btn, variant, "icon_btn")}
      style={{ "--state-layer-bg": "#C0C9C1" } as React.CSSProperties}
      onClick={onClick}
      {...props}
    >
      {href ? (
        <Link to={href} className={cn("material-symbols-rounded icon", classSpan)}>{icon}</Link>
      ) : (
        <span className={cn("material-symbols-rounded icon", classSpan)}>{icon}</span>
      )}
    </Button>
  );
};

export default IconButton;
