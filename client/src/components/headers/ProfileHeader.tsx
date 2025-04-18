/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  detail_banner,
  detail_content,
  detail_header,
  detail_subtitle,
  detail_text,
  detail_title,
  headline_large,
  img_cover,
  img_holder,
  label_large,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Pen, User } from "lucide-react";
import { ProfileUpdateDialog } from "@/components/dialogs";
import { useMemo } from "react";

interface ProfileHeaderProps {
  userInfo: any;
  followingCount: number;
}

const ProfileHeader = ({ userInfo, followingCount }: ProfileHeaderProps) => {
  const backgroundImage = useMemo(() => {
    if (!userInfo?.imageUrl || userInfo.imageUrl.length === 0) return null;
    return userInfo.imageUrl[userInfo.imageUrl.length - 1];
  }, [userInfo]);
  return (
    <section className={cn(detail_header)}>
      <figure
        className={cn(
          img_holder,
          detail_banner,
          "rounded-full group relative flex items-center justify-center"
        )}
      >
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt={userInfo?.name}
            width={300}
            height={300}
            loading="lazy"
            decoding="async"
            className={cn(img_cover)}
          />
        ) : (
          <User size={48} className="text-[#b3b3b390]" />
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
      </figure>

      <div className={cn(detail_content)}>
        <p className={cn(label_large, detail_subtitle)}>Profile</p>

        <h2 className={cn(headline_large, detail_title)}>{userInfo?.name}</h2>

        <div className={cn(detail_text, "flex-wrap has-separator")}>
          <p className={cn(label_large)}>{followingCount} Following</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
