import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiCreateNewPlayer = (track: string) => {
  return axios.post(endpoints.player.createNewPlayer, { track });
};

export const apiGetRecentlyPlayed = () => {
  return axios.get(endpoints.player.getRecentlyPlayed);
}