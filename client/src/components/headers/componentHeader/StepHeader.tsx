interface StepHeaderProps {
  currentStep: number;
  classHeader?: string;
  className?: string;
  text?: string;
}
const StepHeader = ({ currentStep, className, text, classHeader }: StepHeaderProps) => {
  return (
    <header className={classHeader}>
      {currentStep === 0 && (
        <h1 className={className}>
          {text}
        </h1>
      )}
    </header>
  )
}

export default StepHeader