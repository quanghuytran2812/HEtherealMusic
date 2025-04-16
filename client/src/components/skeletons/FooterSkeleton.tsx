import { footer, separator } from "@/lib/classname";
import { cn } from "@/lib/utils";
import React from "react";

const FooterSkeleton = () => {
  return (
    <div className={cn(footer, "animate-pulse")}>
      {Array.from({ length: 4 }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="size-5 rounded-full bg-zinc-700"></div>
          {(index < 3) && <span className={cn(separator)}></span>}
        </React.Fragment>
      ))}
      <div className="h-5 w-[300px] bg-zinc-700 rounded-full"></div>
    </div>
  );
};

export default FooterSkeleton;