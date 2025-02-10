import axios from "@/apis/axios";
import { endpoints } from "./axios";
import { registerData } from "@/utils/types";

export const apiSignUpWithGmail = (data: registerData) => {
  return axios.post(endpoints.user.signUpWithGmail, data);
};

export const apiGetMe = () => {
  return axios.get(endpoints.user.getMe);
};