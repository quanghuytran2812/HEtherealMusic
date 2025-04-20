import React from "react";

interface AccountLinkProps {
  step?: number;
  variant?: "login" | "signup"; // Better type definition
}

// Component for signup-related links
const ExistingAccountPrompt = () => (
  <div className="mt-8 text-center">
    <span className="text-sm text-[#656565]">
      Already have an account?
      <a
        href="/login"
        className="pl-1 text-white underline cursor-pointer hover:text-[#1ed760] transition-colors"
      >
        Sign In
      </a>
    </span>
  </div>
);

// Component for login-related links
const LoginLinks = () => (
  <React.Fragment>
    <div className="flex justify-center my-6">
      <a
        className="underline text-sm hover:text-[#1ed760] transition-colors"
        href="#"
      >
        Forgot your password?
      </a>
    </div>
    <div className="pb-4 text-center">
      <span className="text-[#b3b3b3] pr-1 text-sm font-normal">
        Don't have an account?
      </span>
      <a
        className="text-sm font-normal underline hover:text-[#1ed760] transition-colors"
        href="/signup"
      >
        Sign up
      </a>
    </div>
  </React.Fragment>
);
const AccountLink = ({ step, variant }: AccountLinkProps) => {
  return (
    <>
      {step === 0 && <ExistingAccountPrompt />}
      {variant === "login" && <LoginLinks />}
    </>
  );
};

export default AccountLink;
