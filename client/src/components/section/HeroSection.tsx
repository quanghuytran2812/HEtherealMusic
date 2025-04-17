interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

const HeroSection = ({ title, backgroundImage }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[40vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "top",
        }}
      ></div>
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#191C1A]"></div>
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
