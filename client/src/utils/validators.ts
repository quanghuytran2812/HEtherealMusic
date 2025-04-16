import { z } from "zod";

export const emailValidator = z.object({
  email: z
    .string()
    .email({ message: "This email is not valid. Please make sure the email is entered as example@email.com." })
});

export const passwordValidator = z.object({
  password: z.string().refine((value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasDigitOrSpecial = /[0-9!@#$%^&*]/.test(value);
    const isLongEnough = value.length >= 10;

    return hasLetter && hasDigitOrSpecial && isLongEnough;
  }, {
    message: "Password must have at least 1 letter, 1 digit or special character (e.g. # ? ! &), and 10 characters."
  })
});

export const informationUserValidator = z.object({
  name: z.string().min(1, { message: "Enter a name for your profile." }),
  dob: z.object({
    day: z
      .number({ required_error: "Please enter your date of birth."})
      .min(1, { message: 'Date must be between 1 and 31.' })
      .max(31, { message: 'Date must be between 1 and 31.' }),
    month: z
      .number({ required_error: "Select your birth month."})
      .min(1, { message: 'Month must be from 1 to 12.' })
      .max(12, { message: 'Month must be from 1 to 12.' }),
    year: z
      .number({ required_error: "Please enter your year of birth in 4 digits (eg: 1990)."})
      .min(1900, { message: 'Please enter year of birth from 1900 onwards.' }),
  }).refine((value) => {
    const { day, month, year } = value;
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }, {
    message: "Invalid date of birth."
  }).refine((value) => {
    const { day, month, year } = value;
    const birthDate = new Date(year, month - 1, day);
    const age = getAge(birthDate);
    return age >= 18 && age < 100;
  }, {
    message: "Age must be between 18 and 100."
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error:  "Select your gender.",
  }),
});

export const termsAndConditionsValidator = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Select at least one item.",
  }),
});

// Function to calculate age based on birth date
function getAge(birthDate : Date) {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
}

const MAX_MB = 10;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png", "image/jpeg"];
export const updateProfileValidator = z.object({
  name: z.string({ required_error: "Name is required." })
    .min(1, { message: "Name is required." }),
  imageUrl: z
    .instanceof(File)
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, `Maximum upload size is ${MAX_MB}MB.`)
    .refine((file) => {
      return file.name.trim().length <= 0 || ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Only .jpg, .jpeg, and .png images are accepted.")
});
