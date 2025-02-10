import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { pathname } from "@/lib/pathname";
import { useMeStore } from "@/stores/useMeStore";
import { Slider } from "@/components/ui/slider";
import {
  CirclePlus,
  ListMusic,
  Maximize,
  Mic2,
  MonitorSpeaker,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  SquarePlay,
  TvMinimalPlay,
  Volume1,
} from "lucide-react";

const NowPlayingBar = () => {
  const { me } = useMeStore();
  return (
    <div className="w-full z-20">
      <footer className="flex min-w-[620px] flex-col h-auto">
        {!me ? (
          <div className="flex w-full flex-row cursor-pointer gap-6 items-center justify-between relative pt-[11px] pr-[24px] pb-[7px] pl-[15px] bg-gradient-to-r from-[#af2896] to-[#509bf5]">
            <div className="mb-1 text-white">
              <p className="font-bold text-sm">Preview of HEthereal</p>
              <p className="font-normal text-base">
                Sign up to get unlimited songs and podcasts with occasional ads.
                No credit card needed.
              </p>
            </div>
            <Button className="font-bold text-base">
              <Link
                to={pathname.publics.layout + pathname.publics.signup}
                className="whitespace-nowrap bg-white text-black justify-center items-center px-8 py-2 rounded-full hover:scale-105 hover:bg-white/90"
              >
                Sign up free
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center flex-row justify-between h-[72px]">
            <div className="min-w-[180px] w-[30%] pr-2">
              <div className="flex flex-row justify-start items-center relative">
                {/*  */}
                <div className="relative flex-shrink-0 mr-2">
                  <div className="select-none">
                    <Button className="p-0 h-14" type="button">
                      <div className="h-14 w-14 relative shadow-sm block">
                        <img
                          className="h-full w-full object-cover object-center rounded-sm"
                          src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4c/87/ee/4c87eea4-a107-cc0a-aaee-baa2127799d9/198704304446_Cover.jpg/1200x1200bb.jpg"
                        />
                      </div>
                    </Button>
                  </div>
                </div>
                {/*  */}
                <div className="items-center mx-2 my-0">
                  <p className="text-sm font-medium truncate">
                    <Link
                      to={pathname.publics.layout + pathname.publics.profile}
                      className="hover:underline"
                    >
                      HER
                    </Link>
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    <Link
                      to={pathname.publics.layout + pathname.publics.profile}
                      className="hover:underline"
                    >
                      MINNIE
                    </Link>
                  </p>
                </div>
                {/*  */}
                <Button type="button" className="p-2">
                  <CirclePlus size={16} />
                </Button>
              </div>
            </div>
            <div className="max-w-[722px] w-[40%]">
              <div className="flex flex-col justify-center items-center">
                <div className="w-full flex flex-row flex-nowrap gap-4 mb-2">
                  <div className="flex flex-1 justify-end gap-2">
                    <Button className="px-2 hover:scale-110">
                      <Shuffle size={16} />
                    </Button>
                    <Button className="px-2 hover:scale-110">
                      <SkipBack size={16} />
                    </Button>
                  </div>
                  <Button className="px-2 bg-white rounded-full size-8 hover:bg-white text-black hover:text-black hover:scale-110">
                    <Play size={16} />
                  </Button>
                  <div className="flex flex-1 gap-2">
                    <Button className="px-2 hover:scale-110">
                      <SkipForward size={16} />
                    </Button>
                    <Button className="px-2 hover:scale-110">
                      <Repeat size={16} />
                    </Button>
                  </div>
                </div>

                <div className="w-full flex flex-row items-center justify-between gap-2">
                  <div className="min-w-10 text-right text-[#b3b3b3] text-xs font-normal">
                    1:25
                  </div>
                  <div className="flex flex-1 items-center">
                    <div className="h-3 relative w-full">
                      <Slider
                        defaultValue={[33]}
                        max={100}
                        step={1}
                        className="absolute top-1/2 transform -translate-y-1/2 hover:cursor-pointer active:cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="min-w-10 text-left text-[#b3b3b3] text-xs font-normal">
                    4:04
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[180px] w-[30%] flex flex-row justify-end">
              <div className="flex flex-grow justify-end items-center">
                <Button className="px-2 hover:scale-110">
                  <SquarePlay size={16} />
                </Button>
                <Button className="px-2 hover:scale-110">
                  <Mic2 size={16} />
                </Button>
                <Button className="px-2 hover:scale-110">
                  <ListMusic size={16} />
                </Button>
                <Button className="px-2 hover:scale-110">
                  <MonitorSpeaker size={16} />
                </Button>
                <div className="relative flex flex-none flex-grow basis-[125px] items-center mr-2">
                  <Button>
                    <Volume1 size={16} />
                  </Button>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="w-full hover:cursor-pointer active:cursor-pointer"
                  />
                </div>
                <Button className="px-2 hover:scale-110">
                  <TvMinimalPlay size={16} />
                </Button>
                <Button className="px-2 hover:scale-110">
                  <Maximize size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default NowPlayingBar;
