import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiFollow = (id: string) => {
  return axios.post(endpoints.follow.followUser, { followerId: id });
};

export const apiUnfollow = (followerId: string) => {
  return axios.delete(endpoints.follow.unfollowUser + followerId);
};

export const apiGetArtistsFollowedByUser = (type: string) => {
  return axios.get(endpoints.follow.getArtistsFollowedByUser + type);
};

export const apiGetRelatedArtists = (id: string) => {
  return axios.get(endpoints.follow.getRelatedArtists + id);
};