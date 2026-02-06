import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/admin/users",
  withCredentials: true,
});

export const getAllUsers = () => API.get("/getAllusers");
export const getAllActiveUsers = () => API.get("/getAllActiveUsers");
export const deleteUser = (id) => API.delete(`/deleteUser/${id}`);
