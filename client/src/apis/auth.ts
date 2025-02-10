import axios from "@/apis/axios";
import { endpoints } from "./axios";
import { loginData, VerifyUserData } from "@/utils/types";

export const apiGetCredentialsFromCode = (code: string) => {
  return axios.get(endpoints.auth.getCredentialFromCode + `?code=${code}`);
}

export const apiCheckNewUserFromEmail = (email: string) => {
  return axios.get(endpoints.auth.checkNewUser + email);
};

export const apiLoginWithGmail = (data: loginData) => {
  return axios.post(endpoints.auth.loginWithGmail, data);
};

export const apiLogout = () => {
  return axios.get(endpoints.auth.logout);
};

export const apiRefreshToken = () => {
  return axios.get(endpoints.auth.refreshToken);
};

export const apiVerifyAccount = (data: VerifyUserData) => {
  return axios.put(endpoints.auth.verifyAccount, data);
};