import { Button } from "@/components/ui/button";

const UserAuthentication = () => {
  return (
    <div className="flex gap-2 items-center justify-end no-drag z-10">
      <Button className="h-12 font-bold text-base py-2 pl-2 pr-8 hover:scale-105 transition-colors">
        Sign up
      </Button>
      <Button className="h-12 p-0 font-bold text-base bg-white text-black rounded-full hover:bg-white/80 hover:text-black hover:scale-105">
        <span className="py-2 px-8 items-center justify-center">Log in</span>
      </Button>
    </div>
  );
};

export default UserAuthentication;
