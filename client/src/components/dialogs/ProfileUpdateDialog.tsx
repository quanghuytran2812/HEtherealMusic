import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMeStore } from "@/stores/useMeStore";
import { Pen, User } from "lucide-react";
interface ProfileUpdateDialogProps {
  triggerContent: React.ReactNode;
}

const ProfileUpdateDialog = ({ triggerContent }: ProfileUpdateDialogProps) => {
  const { me } = useMeStore();

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className="sm:max-w-[524px] bg-[#282828]">
        <DialogHeader>
          <DialogTitle className="text-xl">Profile details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[180px_auto] grid-rows-[1fr_40px_32px_1fr] gap-4 px-6 pb-6">
          <Input type="file" className="hidden" />
          <div className="h-[180px] w-[180px] relative group col-start-1 row-start-1 row-end-5">
            <div className="flex relative h-full">
              {!me?.imageUrl ? (
                <div className="h-full w-full select-none">
                  <img
                    className="w-full h-full object-cover object-center rounded-full"
                    src="https://c4.wallpaperflare.com/wallpaper/433/568/993/avatar-download-backgrounds-for-pc-wallpaper-preview.jpg"
                    alt=""
                  />
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center rounded-full bg-[#282828] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                  <User
                    size={48}
                    className="text-[#b3b3b390] group-hover:hidden"
                  />
                </div>
              )}
              <div className="hidden group-hover:block cursor-pointer w-full h-full absolute top-0 left-0 rounded-full bg-black/70">
                <div className="flex flex-col h-full justify-center items-center gap-1">
                  <Pen size={48} />
                  <p className="text-base font-normal hover:underline">Choose photo</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-start-2 row-start-2">
            <Input
              type="text"
              className="px-3 bg-[#FFFFFF1A]"
              value={me?.name}
            />
          </div>
          <div className="flex justify-end items-center col-start-2 row-start-3">
            <Button className="p-0">
              <span className="text-base text-black font-bold bg-white px-6 py-3 rounded-full">
                Save
              </span>
            </Button>
          </div>
          <p className="col-start-1 col-end-3 row-start-5 font-bold text-[0.6875rem]">
            By proceeding, you agree to give HEthereal access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateDialog;
