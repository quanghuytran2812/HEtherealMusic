/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSignUpWithGmail } from "@/apis/user";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMeStore } from "@/stores/useMeStore";
import { formatDate } from "@/utils/format";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { apiCheckNewUserFromEmail } from "@/apis/auth";

interface StepFormProps {
  step: number;
  form: any;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  children: React.ReactNode;
}

const StepForm = ({
  step,
  form,
  totalSteps,
  setCurrentStep,
  children,
}: StepFormProps) => {
  const { registerData, setRegisterData, clearRegisterData } = useMeStore();
  const navigate = useNavigate();

  const handleEmailCheck = async (email: string) => {
    const checkEmailExist = await apiCheckNewUserFromEmail(email);
    if (checkEmailExist.data.hasUser) {
      toast.warning(
        "This address is already associated with an existing account. Please use a different address."
      );
      return false;
    }
    return true;
  };

  const apiSignUpWithGmailPromise = async (registerData: any) => {
    // Simulating an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // You can modify the condition to simulate success or failure
        apiSignUpWithGmail(registerData)
          .then((response) => {
            if (response.data.success) {
              resolve({
                message: response.data.messages,
                email: registerData?.email,
                verified_email: registerData?.verified_email,
              });
              clearRegisterData();
            } else {
              reject(new Error("Registration failed"));
            }
          })
          .catch((error) => reject(error));
      }, 1000);
    });
  };

  const updateRegisterData = (data: any) => {
    setRegisterData({
      ...registerData,
      email: registerData?.email || data?.email, // Only set if prevData.email is undefined
      password: registerData?.password || data?.password, // Only set if prevData.password is undefined
      name: data?.name || registerData?.name, // Only set if prevData.name is undefined
      dob: registerData?.dob || (data?.dob ? formatDate(data.dob) : undefined), // Format only if prevData.dob is undefined
      gender: registerData?.gender || data?.gender, // Only set if prevData.gender is undefined
    });
  };
  const onSubmit = async (data: any) => {
    if (data?.email) {
      const isEmailValid = await handleEmailCheck(data.email);
      if (!isEmailValid) return;
    }

    updateRegisterData(data);

    if (step < totalSteps) {
      setCurrentStep(step + 1);
    } else {
      toast.promise(apiSignUpWithGmailPromise({ ...registerData }), {
        loading: "Registration is in progress...",
        success: (data: any) => {
          if (data?.verified_email) {
            navigate("/login");
            return data?.message;
          } else {
            navigate(`/login?registeredEmail=${data?.email}`);
            return `${data?.message} Please check your email to verify your account before logging in.`;
          }
        }
      });
    }
  };
  return (
    <div>
      {step !== 0 && (
        <div className="mb-3">
          <div className="bg-[#818181] h-0.5">
            <div
              className={`bg-[#1ed760] h-0.5 transition-all duration-200`}
              style={{
                width: `${(step / totalSteps) * 100}%`,
              }}
            />
          </div>
          <div className="flex -mx-[15px]">
            <div className="flex items-center">
              <Button
                className="p-4"
                type="button"
                onClick={() => setCurrentStep(step - 1)}
              >
                {registerData?.verified_email ? (
                  step === 3 ? (
                    <span className="flex">
                      <ArrowLeft className="size-6" />
                    </span>
                  ) : null
                ) : (
                  <span className="flex">
                    <ArrowLeft className="size-6" />
                  </span>
                )}
              </Button>
            </div>
            <div className="py-4 mr-14 flex flex-col items-start">
              <span className="mb-1 text-[#b3b3b3] text-base font-normal">
                {step != 0 && `Step ${step}/${totalSteps}`}
              </span>
              <span className="text-base font-bold">
                {step === 1 && "Create a password"}
                {step === 2 && "Introduce yourself"}
                {step === 3 && "Terms & Conditions"}
              </span>
            </div>
          </div>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {children}
          <Button
            type="submit"
            className="mt-5 p-0 w-full h-12 font-bold text-base"
          >
            <span className="w-full h-full items-center justify-center flex bg-[#1ed760] py-2 px-8 text-[#000000] rounded-full hover:bg-[#1ed760]/80 transition-colors">
              {step === totalSteps ? "Sign Up" : "Continue"}
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StepForm;
