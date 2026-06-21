import api from "./axiosConfig";

// API call for user login
export const loginUser = (data: any) =>
  api.post("/auth/login", data);

// API call for new user registration
export const registerUser = (data: any) =>
  api.post("/auth/register", data);