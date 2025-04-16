import axios from "@/apis/axios";
import { endpoints } from "./axios";

export const apiSearch = async (query: string) => {
  return await axios.get(endpoints.search.search + query);
};