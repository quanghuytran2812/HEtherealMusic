import LanguageButton from "./LanguageButton";
import LegalLink from "./LegalLink";

const LegalLinksSection = () => {
  return (
    <div className="overflow-hidden">
      <div className="text-start my-8 px-6">
        {/* left-sidebar-legal-links */}
        <div className="flex flex-wrap">
          {/* List of legal links */}
          {[
            { href: "#", text: "Legal" },
            { href: "#", text: "Safety & Privacy Center" },
            { href: "#", text: "Privacy Policy" },
            { href: "#", text: "Cookies" },
            { href: "#", text: "About Ads" },
            { href: "#", text: "Accessibility" },
          ].map((link, index) => (
            <LegalLink key={index} href={link.href} text={link.text} />
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
