import {
  communityLinks,
  companyLinks,
  legalLinks,
  planLinks,
  socialLinks,
  usefulLinks,
} from "@/utils/contants";
import { FooterLinkGroup, SocialLink } from "../links";
import { LegalLink } from "../sidebar/componentleftsidebar";
import { useMeStore } from "@/stores/useMeStore";

const FooterMainContent = () => {
  const { me } = useMeStore();
  return (
    <div className="pt-10">
      <nav className="box-border w-full px-8 pt-4 pb-10">
        <div className="flex justify-between">
          <div className="flex flex-1 flex-row gap-6 flex-wrap">
            <FooterLinkGroup title="Company" links={companyLinks} />
            <FooterLinkGroup title="Communities" links={communityLinks} />
            <FooterLinkGroup title="Useful links" links={usefulLinks} />
            <FooterLinkGroup title="Spotify Plans" links={planLinks} />
          </div>
          <div className="mb-10 flex flex-row gap-4">
            {socialLinks.map((link, index) => (
              <SocialLink key={index} href={link.href} icon={link.icon} />
            ))}
          </div>
        </div>
        <hr className="mb-6 border-[#292929]" />
        <div className="flex flex-row pt-4 justify-between items-center">
          {me && (
            <div className="flex flex-wrap">
              {legalLinks.map((link, index) => (
                <LegalLink
                  key={index}
                  href={link.href}
                  text={link.text}
                  classText="text-sm font-normal"
                />
              ))}
            </div>
          )}
          <div className="pr-4">
            <p className="text-sm text-[#b3b3b3] font-normal">
              © 2025 HEthereal AB
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FooterMainContent;
