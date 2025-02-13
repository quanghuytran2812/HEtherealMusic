interface LegalLinkProps {
  href: string;
  text: string;
  classText?: string;
}

const LegalLink = ({ href, text, classText }: LegalLinkProps) => {
  return (
    <div className="mr-4">
      <a href={href}>
        <span className={`text-[#b3b3b3] font-normal hover:text-white ${classText}`}>
          {text}
        </span>
      </a>
    </div>
  );
};

export default LegalLink;
