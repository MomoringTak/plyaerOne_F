import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8008"
});

//Book API
export const bookApi = {
  getBook: (title, display) => api.get(`/book/${title}/${display}`),
  addBook: book => api.post(`/book`, book),
  getAllBook: () => api.get(`/book/`),
  getBookDetail: id => api.get(`/book/${id}`)
};

//User API
export const userApi = {
  ssoGLogin: userInfo => api.post(`/user`, userInfo),
  getUser: googleId => api.get(`/user/${googleId}`),
  updateUser: (googleId, nickname) =>
    api.patch(`/user/${googleId}`, { nickname: nickname })
};
