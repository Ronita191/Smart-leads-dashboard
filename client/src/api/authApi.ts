import api from "./axiosConfig";

export const loginUser = (data: any) =>
  api.post("/auth/login", data);

export const registerUser = (data: any) =>
  api.post("/auth/register", data);