import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiGetPopularPlaylists = () => {
  return axios.get(endpoints.playlist.getPopularPlaylists);
};

export const apiGetTopPlaylists = () => {
  return axios.get(endpoints.playlist.getTopPlaylists);
};

export const apiGetPlaylistById = (id: string) => {
  return axios.get(endpoints.playlist.getPlaylistById + id);
};

export const apiGetPlaylistsByGenre = (genre: string) => {
  return axios.get(endpoints.playlist.getPlaylistsByGenre + genre);
}