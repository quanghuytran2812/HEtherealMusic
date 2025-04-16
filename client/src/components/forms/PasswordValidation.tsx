import { Circle, CircleCheck } from "lucide-react";

interface PasswordValidationProps {
  password: string;
  isErrors: boolean;
}
const PasswordValidation = ({ password, isErrors }: PasswordValidationProps) => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigitOrSpecial = /[0-9#?!&]/.test(password);
  const isLongEnough = password.length >= 10;

  const messagesValidation = [
    {
      condition: hasLetter,
      message: "1 letter",
    },
    {
      condition: hasDigitOrSpecial,
      message: "1 digit or special character (e.g. # ? ! &)",
    },
    {
      condition: isLongEnough,
      message: "10 characters",
    },
  ];

  const getClassName = (condition: boolean, isError: boolean) => {
    if (!isError) return "text-white";
    return condition ? "text-white" : "text-red-400";
  };

  return (
    <div>
      <span className="font-bold text-sm text-white">
        Your password must be at least
      </span>
      <ul>
        {messagesValidation.map((value, index) => (
          <li key={index} className="flex items-baseline mt-1">
            {value.condition ? (
              <CircleCheck
                size={12}
                className="bg-[#1ed760] rounded-full text-black"
              />
            ) : (
              <Circle size={12} />
            )}
            <p
              className={`ml-2 text-sm ${getClassName(
                value.condition,
                isErrors
              )}`}
            >
              {value.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordValidation;
