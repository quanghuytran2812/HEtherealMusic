/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./FormInput";
import FormPasswordInput from "./FormPasswordInput";
import { Button } from "../ui/button";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { loginData } from "@/utils/types";
import { apiLoginWithGmail } from "@/apis/auth";
import { toast } from "sonner";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMeStore } from "@/stores/useMeStore";
import { NotificationAlert } from "../alerts";
import { formInput } from "@/lib/classname";

const notificationMessages = {
  registered: (email: string) => (
    <>
      An email has been sent to <strong>{email}</strong>. Please check your
      email to verify your account before logging in!
    </>
  ),
  verified: (email: string) => (
    <>
      <strong>{email}</strong> has been verified. Now you can log in to enjoy
      your music!
    </>
  ),
};

const LoginForm = () => {
  const { setIsAuthenticated } = useMeStore();
  const [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get("registeredEmail");
  const verifiedEmail = searchParams.get("verifiedEmail");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const form = useForm<
    z.infer<typeof emailValidator & typeof passwordValidator>
  >({
    resolver: zodResolver(
      z.object({
        ...emailValidator.shape,
        ...passwordValidator.shape,
      })
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onSubmit = async (data: loginData) => {
    toast.promise(apiLoginWithGmailPromise({...data, typeLogin: 'password'}), {
      loading: "Logging in...",
      success: (data: any) => {
        setIsAuthenticated(true);
        navigate(from, { replace: true });
        return data?.message;
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {registeredEmail && (
        <NotificationAlert
          message={notificationMessages.registered(registeredEmail)}
          variant="info"
          open={true}
        />
      )}

      {verifiedEmail && (
        <NotificationAlert
          message={notificationMessages.verified(verifiedEmail)}
          variant="success"
          open={true}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            form={form}
            label="Email"
            name="email"
            placeholder="name@domain.com"
            classInput={formInput}
          />
          <FormPasswordInput
            form={form}
            label="Password"
            name="password"
            placeholder="Password"
            onErrorMessage={true}
          />
          <Button type="submit" className="p-0 w-full h-12 font-bold text-base">
            <span className="w-full h-full items-center justify-center flex bg-[#1ed760] py-2 px-8 text-[#000000] rounded-full hover:bg-[#1ed760]/80 transition-colors">
              Sign In
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
