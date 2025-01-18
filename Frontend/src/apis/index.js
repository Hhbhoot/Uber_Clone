import axios from "axios";
import config from "../config/config";

const http = axios.create({
  baseURL: config.base_url,
});

http.interceptors.request.use((config) => {
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
export const updateDrivingStatus = async (params, headers) =>
  http.patch("/api/v1/captain/update-status", { params, headers });

export const getSuggestions = async (input, params, headers) =>
  http.get(`/api/v1/maps/get-suggestions?address=${input}`, {
    params,
    headers,
  });

export const getFareDetails = async (data, params, headers) =>
  http.post("/api/v1/maps/get-fare-details", data, { params, headers });

export const captainLogut = async (params, headers) =>
  http.get("/api/v1/captain/logout", { params, headers });

export const userLogut = async (params, headers) =>
  http.get("/api/v1/user/logout", { params, headers });

export const confirmRideBooking = async (data, params, headers) =>
  http.post("/api/v1/rides/create-ride", data, { params, headers });

export const confirmRide = async (data, params, headers) =>
  http.patch("/api/v1/rides/confirm-ride", data, { params, headers });

export const startRide = async (data, params, headers) =>
  http.patch("/api/v1/rides/start-ride", data, { params, headers });
