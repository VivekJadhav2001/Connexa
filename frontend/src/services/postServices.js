import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_API_V1}/api/post`;

export const postServices = {
  createPost: (payload) => {
    return axios.post(`${API}/createPost`, payload, { withCredentials: true });
  },

  getMyPosts: () => {
    return axios.get(`${API}/my-posts`, { withCredentials: true });
  },

  getAllPosts: () => {
    return axios.get(`${API}/allPosts`, { withCredentials: true });
  },

  likePost: (postId) => {
    return axios.post(
      `${API}/likePost/${postId}`,
      {},
      { withCredentials: true }
    );
  },

  //Comment is due from backend controller

  updatePost: (postId, payload) => {
    return axios.patch(`${API}/updatePost/${postId}`, payload, {
      withCredentials: true,
    });
  },
  deletePost: (postId) => {
    return axios.delete(`${API}/deletePost/${postId}`, {
      withCredentials: true,
    });
  },

  createComment: (postId, payload) => {
    return axios.post(`${API}/comment/${postId}`, payload, {
      withCredentials: true,
    });
  },
};
