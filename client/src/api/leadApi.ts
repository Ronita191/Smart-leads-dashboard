import axios from "axios";

// Create reusable Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// Automatically attach JWT token to every request
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

// Fetch leads with pagination, search, and filters
export const getLeads = (
  page = 1,
  search = "",
  status = "",
  source = ""
) =>
  API.get(
    `/leads?page=${page}&search=${search}&status=${status}&source=${source}`
  );


// Create a new lead
export const createLead = async (data: {
  name: string;
  email: string;
  status: string;
  source: string;
}) => {
  return await API.post("/leads", data);
};

// Delete lead by ID
export const deleteLead = async (id: string) => {
  return await API.delete(`/leads/${id}`);
};

// Update existing lead
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