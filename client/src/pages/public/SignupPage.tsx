import { FooterAuthentication } from "@/components/footers";
import { StepFormContainer } from "@/components/forms";
import { Logo, StepHeader } from "@/components/headers/componentHeader";
import { AccountLink, GoogleSignUpButton } from "@/components/links";
import { useState } from "react";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  return (
    <main className="absolute top-0 left-0 flex flex-col overflow-auto w-full min-h-full bg-black text-white">
      <header className="flex justify-center items-center min-h-8 pt-8 pb-6 overflow-hidden">
        <Logo className="h-10" classImg="size-10 bg-white rounded-full" />
      </header>
      <section className="flex-grow flex w-full justify-center">
        <div className="px-8 w-96">
          <StepHeader
            currentStep={currentStep}
            classHeader="mb-10 text-center"
            className="text-5xl font-bold text-balance"
            text="Đăng ký để bắt đầu nghe"
          />
          <StepFormContainer
            currentStep={currentStep}
            totalSteps={totalSteps}
            setCurrentStep={setCurrentStep}
          />
          <GoogleSignUpButton
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <AccountLink step={currentStep} />
        </div>
      </section>
      <FooterAuthentication />
    </main>
  );
};

export default SignupPage;
