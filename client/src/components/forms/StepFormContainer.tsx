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
import { formInput } from "@/lib/classname";
import { useEffect } from "react";
import { useMeStore } from "@/stores/useMeStore";

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
  const { registerData } = useMeStore();

  const forms = {
    email: useCreateForm(emailValidator, { email: "" }),
    password: useCreateForm(passwordValidator, { password: "" }),
    userInfo: useCreateForm(informationUserValidator, {
      name: "",
      dob: { day: undefined, month: undefined, year: undefined },
    }),
    terms: useCreateForm(termsAndConditionsValidator, { items: [] }),
  };

    useEffect(() => {
      if (registerData?.name) {
        forms.userInfo.reset({
          name: registerData.name || "",
          dob: { day: undefined, month: undefined, year: undefined }
        });
      }
    }, [registerData?.name, forms.userInfo]);

  const stepsContent = [
    {
      // Email Address
      form: forms.email,
      component: (
        <FormInput
          form={forms.email}
          label="Email"
          name="email"
          placeholder="name@domain.com"
          classInput={formInput}
        />
      ),
    },
    {
      // Password
      form: forms.password,
      component: (
        <FormPasswordInput
          form={forms.password}
          label="Password"
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
            label="Name"
            desc="This name will appear on your profile."
            name="name"
            classInput={formInput}
          />
          <DateOfBirthInput form={forms.userInfo} label="Date of birth" />
          <GenderInput form={forms.userInfo} name="gender" label="Gender" />
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
