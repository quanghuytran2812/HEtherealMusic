import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiGetNewReleases = () => {
  return axios.get(endpoints.album.newRelease);
};

export const apiGetAlbumById = (id: string) => {
  return axios.get(endpoints.album.getAlbumById + id);
};

export const apiGetAllAlbumsByArtist = (id: string) => {
  return axios.get(endpoints.album.getAllAlbumsByArtist + id);
};