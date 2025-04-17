import axios from "@/apis/axios";
import { endpoints } from "./axios";
import { CreateSongData } from "@/utils/types";

export const apiCreateSong = (data: CreateSongData) => {
  return axios.post(endpoints.song.createSong, data, { headers: { "Content-Type": "multipart/form-data" } });
};

export const apiLikeSong = (id: string) => {
  return axios.post(endpoints.song.likeSong, { songId: id });
};

export const apiUnlikeSong = (id: string) => {
  return axios.delete(endpoints.song.unlikeSong + id);
};

export const apiGetSongById = (id: string) => {
  return axios.get(endpoints.song.getSongById + id);
};

export const apiGetRecommendedSongsByIds = (ids: string) => {
  return axios.get(endpoints.song.getRecommendedSongsByIds + ids);
}