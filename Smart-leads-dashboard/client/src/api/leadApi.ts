import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ADD TOKEN AUTOMATICALLY
API.interceptors.request.use(

  (req) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;
    }

    return req;
  }
);

// GET LEADS
export const getLeads = (
  page = 1,
  search = "",
  status = "",
  source = ""
) =>
  API.get(
    `/leads?page=${page}&search=${search}&status=${status}&source=${source}`
  );


// CREATE LEAD
export const createLead = async (data: {
  name: string;
  email: string;
  status: string;
  source: string;
}) => {
  return await API.post("/leads", data);
};

// DELETE LEAD
export const deleteLead = async (id: string) => {
  return await API.delete(`/leads/${id}`);
};

// UPDATE LEAD
// UPDATE LEAD
export const updateLead = async (
  id: string,
  data: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {
  return await API.put(`/leads/${id}`, data);
};