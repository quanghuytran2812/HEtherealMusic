const FooterAuthentication = () => {
  return (
    <footer className="p-6">
      <p className="text-xs font-normal text-center text-[#656565]">
        This site is protected by reCAPTCHA and the Google
        <br />
        <a
          className="underline pr-1 hover:text-white"
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        and
        <a
          className="underline px-1 hover:text-white"
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        apply.
      </p>
    </footer>
  );
};

export default FooterAuthentication;