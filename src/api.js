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

export const booklistApi = {
  serachBook: title => api.get(`/booklist/${title}`),
  addBookList: booklist => api.post(`/booklist`, booklist),
  getBookList: googleId =>
    api.get(`/booklist`, { params: { googleId: googleId } }),
  getOneBookList: id => api.get(`/booklist/item/${id}`),
  deleteBookList: (id, googleId) =>
    api.delete(`/booklist`, {
      params: {
        id: id,
        googleId: googleId
      }
    }),
  getBooks: id => api.get(`/booklist/detail/${id}`)
};

export const commentApi = {
  commentBook: data => api.post("/book/comment", data),
  bookComment: id => api.get(`/comment/${id}`),
  deleteComment: id => api.delete("/comment", { params: { id: id } })
};
