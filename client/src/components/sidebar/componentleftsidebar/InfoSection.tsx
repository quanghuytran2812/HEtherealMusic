import { Button } from "@/components/ui/button";

interface InfoSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void; // Function type for button action
}
const InfoSection = ({
  title,
  description,
  buttonText,
  buttonAction,
}: InfoSectionProps) => {
  return (
    <section className="flex flex-col justify-center items-start bg-[#1f1f1f] rounded-lg gap-5 px-5 py-4 my-2">
      <div className="flex flex-col gap-2">
        <span className="text-base font-bold">{title}</span>
        <span className="text-sm font-normal">{description}</span>
      </div>
      <div className="align-self">
        <Button
          className="font-bold text-sm bg-white text-black rounded-2xl p-0 hover:bg-white/90 hover:scale-105 hover:text-black"
          onClick={buttonAction} // Attach the button action
        >
          <span className="py-1 px-4">{buttonText}</span>
        </Button>
      </div>
    </section>
  );
};

export default InfoSection;
