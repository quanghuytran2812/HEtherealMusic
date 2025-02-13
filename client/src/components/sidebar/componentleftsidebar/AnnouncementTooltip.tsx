import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AnnouncementTooltipProps {
  isVisible: boolean;
  onClose: () => void; 
}
const AnnouncementTooltip = ({ isVisible, onClose  }: AnnouncementTooltipProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute h-fit inset-y-0 m-0 left-[29%] translate-y-[140px] z-50 ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <div className="max-w-[336px] bg-[#69bfff] rounded-lg text-sm relative shadow-[0_4px_40px_rgba(0,0,0,0.3)] text-black text-start">
        <div className="p-4 relative">
          <div className="max-w-[336px] min-w-[300px] relative">
            <div className="flex items-center justify-between mb-2 whitespace-pre-wrap break-words">
              <p className="font-bold text-base">Create a playlist</p>
            </div>
            <p className="text-sm font-normal">
              Log in to create and share playlists.
            </p>
            <div className="flex flex-wrap justify-between mt-6">
              <div></div>
              <div className="flex flex-wrap justify-end">
                <Button
                  className="text-sm font-bold text-black shadow-transparent hover:scale-105 hover:text-black transition-all"
                  onClick={onClose}
                >
                  Not now
                </Button>
                <Button onClick={() => navigate("/login")} className="text-sm font-bold bg-white text-black rounded-full hover:bg-white/90 hover:text-black hover:scale-105 transition-all">
                  Log in
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-[-3px] w-4 h-4 translate-y-[66px] bg-[#69bfff] pointer-events-none
        rotate-45" />
      </div>
    </div> 
  );
};

export default AnnouncementTooltip;
