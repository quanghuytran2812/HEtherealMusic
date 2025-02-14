import { Pen, User } from "lucide-react";
import { Button } from "../ui/button";
import { ProfileUpdateDialog } from "../dialogs";
import { useMeStore } from "@/stores/useMeStore";

interface ProfileHeaderProps {
  name: string | undefined;
  publicPlaylists: number;
  following: number;
}

const ProfileInfo = ({
  name,
  publicPlaylists,
  following,
}: ProfileHeaderProps) => (
  <div className="flex flex-1 flex-col h-full justify-end gap-8">
    <span className="text-sm font-normal">Profile</span>
    <span className="w-full">
      <ProfileUpdateDialog
        triggerContent={
          <Button className="p-0">
            <h1 className="text-[#fff] text-8xl font-extrabold">{name}</h1>
          </Button>
        }
      />
    </span>
    <div className="flex flex-wrap items-center mt-2 gap-1">
      <span className="text-sm font-normal text-[#FFFFFFB3]">
        {publicPlaylists} Public Playlist
      </span>
      <span className="text-sm font-normal text-[#FFFFFFB3]">•</span>
      <a href="#" className="text-[#F8FAFC] hover:underline">
        <span className="text-sm font-normal">{following} Following</span>
      </a>
    </div>
  </div>
);
const ProfileHeader = () => {
  const { me } = useMeStore();

  return (
    <div className="h-52 bg-gradient-to-b from-[#535353] to-[#2f2f2f] rounded-lg">
      <div className="px-5 pb-5 flex justify-start items-center h-full">
        <div className="mr-5 h-full flex flex-col justify-end group">
          <div className="relative flex items-center justify-center bg-[#282828] size-[158px] rounded-full">
            {me?.imageUrl ? (
              <img
                className="w-full h-full object-cover object-center rounded-full"
                src={me?.imageUrl}
                alt={me?.name}
              />
            ) : (
              <User size={48} className="text-[#b3b3b390] group-hover:hidden" />
            )}
            <div className="hidden group-hover:block cursor-pointer w-full h-full absolute top-0 left-0 rounded-full bg-black/70">
              <ProfileUpdateDialog
                triggerContent={
                  <div className="flex flex-col h-full justify-center items-center gap-1">
                    <Pen size={48} />
                    <p className="text-base font-normal">Choose photo</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <ProfileInfo name={me?.name} publicPlaylists={1} following={1} />
      </div>
    </div>
  );
};

export default ProfileHeader;
