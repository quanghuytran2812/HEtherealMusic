import { separator, social_link } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  isLast: boolean;
}
const SocialLink = ({ href, icon: Icon, isLast }: SocialLinkProps) => {
  return (
    <>
      <Link
        to={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(social_link)}
      >
        <Icon size={18} />
      </Link>
      {!isLast && <span className={cn(separator)}></span>}
    </>
  );
};

export default SocialLink;
