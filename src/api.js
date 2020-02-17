import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8008"
});

//Book API
export const bookApi = {
  getBook: (title, display) => api.get(`/book/${title}/${display}`),
  getBookDetail: id => api.get(`/book/${id}`),
  getRecentBook: () => api.get(`/book/recentbook`)
};

//User API
export const userApi = {
  newUser: userInfo => api.post(`/users`, userInfo),
  getUser: googleId => api.get(`/userInfo/${googleId}`),
  updateUser: (googleId, nickname) =>
    api.patch(`/updateUser/${googleId}`, { nickname: nickname })
};
