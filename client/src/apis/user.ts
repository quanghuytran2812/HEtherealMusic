import axios from "@/apis/axios";
import { endpoints } from "./axios";
import { registerData, UpdateUserData } from "@/utils/types";

export const apiSignUpWithGmail = (data: registerData) => {
  return axios.post(endpoints.user.signUpWithGmail, data);
};

export const apiGetMe = () => {
  return axios.get(endpoints.user.getMe);
};

export const apiUpdateUser = (data: UpdateUserData) => {
  return axios.put(endpoints.user.updateUser, data, { headers: { "Content-Type": "multipart/form-data" } });
};

export const apiRecommendArtists = (artistIds: string) => {
  return axios.get(endpoints.user.recommendArtists+ `?artistIds=${artistIds}`);
};

export const apiGetTop = (type: string, limit: number = 5, offset: number = 0) => {
  return axios.get(endpoints.user.getTop + type + `?limit=${limit}&offset=${offset}`);
};

export const apiGetUserById = (id: string) => {
  return axios.get(endpoints.user.getUserById + id);
};

export const apiGetArtistTopTracks = (id: string) => {
  return axios.get(endpoints.user.getArtistTopTracks + id);
};