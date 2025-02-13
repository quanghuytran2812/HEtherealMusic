import { Link } from "react-router-dom";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
}
const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => {
  return (
    <div className="size-10 bg-[#292929] rounded-full flex items-center justify-center hover:bg-white/40">
      <Link to={href}>
        <Icon size={18} />
      </Link>
    </div>
  );
};

export default SocialLink;
