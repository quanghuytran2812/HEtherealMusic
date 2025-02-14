/* eslint-disable @typescript-eslint/no-explicit-any */
import StepForm from "./StepForm";
import DateOfBirthInput from "./DateOfBirthInput";
import GenderInput from "./GenderInput";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  emailValidator,
  informationUserValidator,
  passwordValidator,
  termsAndConditionsValidator,
} from "@/utils/validators";
import TermsAndConditions from "./TermsAndConditions";
import FormPasswordInput from "./FormPasswordInput";
import { classname } from "@/lib/classname";

interface StepFormContainerProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
}
// Function to create a form with validation
const useCreateForm = (validator: any, defaultValues: any) => {
  return useForm({
    resolver: zodResolver(validator),
    defaultValues,
    mode: "onBlur",
  });
};

const StepFormContainer = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}: StepFormContainerProps) => {

  const forms = {
    email: useCreateForm(emailValidator, { email: "" }),
    password: useCreateForm(passwordValidator, { password: "" }),
    userInfo: useCreateForm(informationUserValidator, {
      name: "",
      dob: { day: undefined, month: undefined, year: undefined },
    }),
    terms: useCreateForm(termsAndConditionsValidator, { items: [] }),
  };

  const stepsContent = [
    {
      // Email Address
      form: forms.email,
      component: (
        <FormInput
          form={forms.email}
          label="Địa chỉ email"
          name="email"
          placeholder="name@domain.com"
          classInput={classname.formInput}
        />
      ),
    },
    {
      // Password
      form: forms.password,
      component: (
        <FormPasswordInput
          form={forms.password}
          label="Mật khẩu"
          name="password"
          onErrorMessage={false}
        />
      ),
    },
    {
      // User Information
      form: forms.userInfo,
      component: (
        <>
          <FormInput
            form={forms.userInfo}
            label="Tên"
            desc="Tên này sẽ xuất hiện trên hồ sơ của bạn"
            name="name"
            classInput={classname.formInput}
          />
          <DateOfBirthInput form={forms.userInfo} label="Ngày sinh" />
          <GenderInput form={forms.userInfo} name="gender" label="Giới tính" />
        </>
      ),
    },
    {
      // Terms & Conditions
      form: forms.terms,
      component: <TermsAndConditions form={forms.terms} name="items" />,
    },
  ];

  return (
    <StepForm
      step={currentStep}
      form={stepsContent[currentStep].form}
      totalSteps={totalSteps}
      setCurrentStep={setCurrentStep}
    >
      {stepsContent[currentStep]?.component}
    </StepForm>
  );
};

export default StepFormContainer;
