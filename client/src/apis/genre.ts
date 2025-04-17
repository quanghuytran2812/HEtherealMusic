import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiGetAllGenres = () => {
  return axios.get(endpoints.genre.getAllGenres);
};

export const apiGetGenreById = (id: string) => {
  return axios.get(endpoints.genre.getGenreById + id);
};