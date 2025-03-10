import { Play } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { icon_btn, play_btn } from "@/lib/classname"

const PlayButton = () => {
  return (
    <Button className={cn(icon_btn, play_btn)}>
      <span className="material-symbol-rounded icon play-icon"><Play /></span>
      {/* <span className="material-symbol-rounded icon pause-icon"><Pause /></span> */}
    </Button>
  )
}

export default PlayButton