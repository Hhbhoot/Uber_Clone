import axios from "axios";
import config from "../config/config";

const http = axios.create({
  baseURL: config.base_url,
});

http.interceptors.request.use((config) => {
  // Do something before request is sent

  let token = localStorage.getItem("authToken") || null;
  req.headers.authorization = `Bearer ${token}`;
  return config;
});

export const userLogin = async (data, params, headers) =>
  http.post("/api/v1/user/login", data, { params, headers });
