interface AccountLinkProps {
  step?: number;
  variant?: "login" | "signup"; // Better type definition
}

// Component for signup-related links
const ExistingAccountPrompt = () => (
  <p className="mt-8">
    <span className="block text-center text-[#656565]">
      Bạn đã có tài khoản?
      <a
        href="/login"
        className="pl-1 text-white underline cursor-pointer"
      >
        Đăng nhập tại đây
      </a>
    </span>
  </p>
);

// Component for login-related links
const LoginLinks = () => (
  <div>
    <div className="flex justify-center my-6">
      <a
        className="underline hover:text-[#1ed760] transition-colors"
        href="#"
      >
        Quên mật khẩu của bạn?
      </a>
    </div>
    <div className="pb-4 text-center">
      <span className="text-[#b3b3b3] pr-1 text-base font-normal">
        Bạn chưa có tài khoản?
      </span>
      <a
        className="text-base font-normal underline hover:text-[#1ed760] transition-colors"
        href="/signup"
      >
        Đăng ký Spotify
      </a>
    </div>
  </div>
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
