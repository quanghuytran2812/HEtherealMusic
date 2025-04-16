import { body_medium, footer } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/utils/contants";
import { SocialLink } from "../links";

const Footer = () => {
  return (
    <div className={cn(footer)}>
      <div className="text-[#C0C9C1] flex items-center">
        {socialLinks.map((link, index) => (
          <SocialLink
            key={index}
            href={link.href}
            icon={link.icon}
            isLast={index === socialLinks.length - 1}
          />
        ))}
      </div>
      <p className={cn(body_medium, "opacity-80")}>
        &copy; 2025 HEthereal. Developed by Augustus
      </p>
    </div>
  );
};

export default Footer;
