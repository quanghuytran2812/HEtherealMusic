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