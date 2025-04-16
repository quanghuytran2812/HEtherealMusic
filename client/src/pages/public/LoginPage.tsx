import { FooterAuthentication } from "@/components/footers";
import { LoginForm } from "@/components/forms";
import { Logo, StepHeader } from "@/components/headers";
import { AccountLink, GoogleLoginButton } from "@/components/links";

const LoginPage = () => {
  return (
    <main className="absolute top-0 left-0 flex flex-col overflow-auto w-full min-h-full bg-black text-white">
      <header className="flex justify-center items-center min-h-8 pt-8 pb-6 overflow-hidden">
        <Logo className="h-10" classImg="size-10 bg-white rounded-full" />
      </header>
      <section className="flex-grow flex w-full justify-center">
        <div className="px-8 w-96 flex flex-col">
          <StepHeader
            currentStep={0}
            classHeader="h-fit w-full"
            className="text-center font-bold text-balance text-2xl"
            text="Log In HEthereal"
          />
          <div className="mt-8">
            <GoogleLoginButton />
          </div>
          <hr className="my-8 border-[#656565]" />
          <LoginForm />
          <AccountLink variant="login" />
        </div>
      </section>
      <FooterAuthentication />
    </main>
  );
};

export default LoginPage;
