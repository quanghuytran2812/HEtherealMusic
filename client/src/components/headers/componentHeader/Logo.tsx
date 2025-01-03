const Logo = () => {
  return (
    <div className="flex gap-2 items-center z-10">
      <a href="/" className="m-5">
        <img
          src="/logo.svg"
          alt="HEthereal"
          className="size-8 bg-white rounded-full"
        />
      </a>
    </div>
  );
};

export default Logo;
