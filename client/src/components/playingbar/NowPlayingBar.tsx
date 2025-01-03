import { Button } from "../ui/button"

const NowPlayingBar = () => {
  return (
    <div className="w-full z-20">
    <footer className="flex min-w-[620px] flex-col h-auto">
      <div className="flex w-full flex-row cursor-pointer gap-6 items-center justify-between relative pt-[11px] pr-[24px] pb-[7px] pl-[15px] bg-gradient-to-r from-[#af2896] to-[#509bf5]">
        <div className="mb-1 text-white">
          <p className="font-bold text-sm">Preview of HEthereal</p>
          <p className="font-normal text-base">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
        </div>
        <Button className="font-bold text-base">
          <span className="whitespace-nowrap bg-white text-black justify-center items-center px-8 py-2 rounded-full hover:scale-105 hover:bg-white/90">
            Sign up free
          </span>
        </Button>
      </div>
    </footer>
  </div>
  )
}

export default NowPlayingBar