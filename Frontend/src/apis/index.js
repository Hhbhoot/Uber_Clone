import axios from "axios";
import config from "../config/config";

const http = axios.create({
  baseURL: config.base_url,
});

http.interceptors.request.use((config) => {
  // Do something before request is sent

  let token = localStorage.getItem("authToken") || null;
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export const userLogin = async (data, params, headers) =>
  http.post("/api/v1/user/login", data, { params, headers });

export const userSignup = async (data, params, headers) =>
  http.post("/api/v1/user/register", data, { params, headers });

export const userTokenCheck = async (params, headers) =>
  http.get("/api/v1/user/profile", { params, headers });

export const captainLogin = async (data, params, headers) =>
  http.post("/api/v1/captain/login", data, { params, headers });

export const captainSignup = async (data, params, headers) =>
  http.post("/api/v1/captain/register", data, { params, headers });

export const captainTokenCheck = async (params, headers) =>
  http.get("/api/v1/captain/profile", { params, headers });
