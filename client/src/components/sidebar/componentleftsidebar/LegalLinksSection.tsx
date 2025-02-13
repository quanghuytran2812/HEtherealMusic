import { legalLinks } from "@/utils/contants";
import LanguageButton from "./LanguageButton";
import LegalLink from "./LegalLink";

const LegalLinksSection = () => {
  return (
    <div className="overflow-hidden">
      <div className="text-start my-8 px-6">
        {/* left-sidebar-legal-links */}
        <div className="flex flex-wrap">
          {/* List of legal links */}
          {legalLinks.map((link, index) => (
            <LegalLink
              key={index}
              href={link.href}
              text={link.text}
              classText="text-[0.6875rem]"
            />
          ))}
        </div>
        <a href="#">
          <span className="text-xs font-medium hover:underline">Cookies</span>
        </a>
      </div>
      <LanguageButton />
    </div>
  );
};

export default LegalLinksSection;
