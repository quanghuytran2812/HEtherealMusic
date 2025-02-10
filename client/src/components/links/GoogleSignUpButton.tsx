/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  apiCheckNewUserFromEmail,
  apiGetCredentialsFromCode,
} from "@/apis/auth";
import { useMeStore } from "@/stores/useMeStore";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

interface GoogleSignUpButtonProps {
  step: number;
  setCurrentStep: (step: number) => void;
}
const GoogleSignUpButton = ({
  step,
  setCurrentStep,
}: GoogleSignUpButtonProps) => {
  const { setRegisterData } = useMeStore();

  const handleEmailCheck = async (email: string) => {
    const checkEmailExist = await apiCheckNewUserFromEmail(email);
    if (checkEmailExist.data.hasUser) {
      toast.warning(
        "Địa chỉ này đã được liên kết với một tài khoản hiện có. Vui lòng dùng địa chỉ khác."
      );
      return false;
    }
    return true;
  };

  const handleSignUpGoogle = async (authResult: any) => {
    if (authResult["code"]) {
      const response = await apiGetCredentialsFromCode(authResult["code"]);
      if (response.status === 200) {
        // check email exists
        const isEmailValid = await handleEmailCheck(response.data.email);
        if (!isEmailValid) return;
        
        setRegisterData({
          email: response.data.email,
          name: response.data.name,
          imageUrl: response.data.picture,
          verified_email: response.data.verified_email,
        });
        setCurrentStep(step + 2);
      }
    }
  };

  const handleSignUpGoogleError = (error: any) => {
    toast.error(error.error_description || "An error occurred during login.");
  };

  const handleSignUpWithGoogle = useGoogleLogin({
    onSuccess: handleSignUpGoogle,
    onError: handleSignUpGoogleError,
    flow: "auth-code",
  });
  return (
    <>
      {step === 0 && (
        <div className="mt-8">
          <div className="w-full relative flex justify-center before:content-[''] before:w-full before:h-[1px] before:bg-[#818181] before:block before:absolute before:top-1/2 before:left-0">
            <span className="px-3 relative inline-block text-sm font-normal bg-black">
              hoặc
            </span>
          </div>
          <div className="mt-8">
            <a
              onClick={() => handleSignUpWithGoogle()}
              className="cursor-pointer flex rounded-full font-bold text-center align-middle relative border border-[#818181] items-center justify-center pl-14 py-2 pr-8 hover:border-white"
            >
              <span className="flex absolute left-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                  className="size-6"
                  alt="Google Logo"
                />
              </span>
              Đăng ký bằng Google
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleSignUpButton;
