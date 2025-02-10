/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiGetCredentialsFromCode, apiLoginWithGmail } from "@/apis/auth";
import { useMeStore } from "@/stores/useMeStore";
import { loginData } from "@/utils/types";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleLoginButton = () => {
  const { setIsAuthenticated } = useMeStore();
  const navigate = useNavigate();

  const apiLoginWithGmailPromise = async (loginGmailData: loginData) => {
    // Simulating an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // You can modify the condition to simulate success or failure
        apiLoginWithGmail(loginGmailData)
          .then((response) => {
            if (response.data.success) {
              resolve({ message: response.data.message });
            } else {
              reject(new Error("Login failed"));
            }
          })
          .catch((error) => reject(error));
      }, 1000);
    });
  };
  const handleLoginSuccess = async (authResult: any) => {
    if (authResult["code"]) {
      const response = await apiGetCredentialsFromCode(authResult["code"]);
      if (response.status === 200) {
        toast.promise(apiLoginWithGmailPromise({ email: response.data.email, typeLogin: 'google' }), {
          loading: "Logging in...",
          success: (data: any) => {
            setIsAuthenticated(true);
            navigate("/");
            return data?.message;
          },
        });
      }
    }
  };
  const handleLoginError = (error: any) => {
    toast.error(error.error_description || "An error occurred during login.");
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    flow: "auth-code",
  });
  return (
    <a
      onClick={() => handleLoginWithGoogle()}
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
  );
};

export default GoogleLoginButton;
