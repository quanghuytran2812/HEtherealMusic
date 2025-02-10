interface LogoProps {
  className?: string;
  classImg?: string;
  classLink?: string;
}

const Logo = ({ className, classLink, classImg }: LogoProps) => {
  return (
    <div className={className}>
      <a href="/" className={classLink}>
        <img src="/logo.svg" alt="HEthereal" className={classImg} />
      </a>
    </div>
  );
};

export default Logo;
