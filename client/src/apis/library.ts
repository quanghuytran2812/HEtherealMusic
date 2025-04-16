import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiCreateLibrary = (id: string) => {
  return axios.post(endpoints.library.createNewLibrary, { track: id });
}

export const apiDeleteItemFromLibrary = (id: string) => {
  return axios.delete(endpoints.library.deleteItemFromLibrary + id);
}

export const apiGetLibraryForMe = () => {
  return axios.get(endpoints.library.getLibraryForMe);
}