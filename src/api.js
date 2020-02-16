import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8008"
});

const getBook = () => api.get(`/book`);
const getBookDetail = id => api.get(`/book/${id}`);
const getRecentBook = () => api.get(`/book/recentbook`);

const newUser = userInfo => api.post(`/users`, userInfo);
// const addBook = () => api.post(``);

const getUser = googleId => api.get(`/userInfo/${googleId}`);

const updateUser = (googleId, nickname) =>
  api.patch(`/updateUser/${googleId}`, { nickname: nickname });

// For the user who added book has a authority to delete the book
// This delete feature isn't decided since haven't decided who can add book
// const deleteBook = (id) => api.delete(``);

const getShelf = () => api.get(`/shelf`);
const getUserShelf = userId => api.get(`${userId}/shlef`);
const getBooklist = userId => api.get(`${userId}/booklist`);
const getBooklistDetail = (userId, booklistId) =>
  api.get(`${userId}/booklist/${booklistId}`);

// const createBookList = () => api.post(``);
//const deleteBookList = () => api.delete(``);

const getProfile = id => api.get(`${id}/profile`);
// const updateProfile = () => api.put(``)

const getComment = id => api.get(`/book/${id}/comment`);
// const updateComment = () => api.patch();
// const deleteCommnet = id => api.delete();

const getBookExpression = id => api.get(`/book/${id}/expression`);
const getBookListExpression = id => api.get(`/booklist/${id}/expression`);

export {
  getBook,
  getBookDetail,
  getComment,
  getShelf,
  getUserShelf,
  getBooklist,
  getBooklistDetail,
  getProfile,
  getRecentBook,
  getBookExpression,
  getBookListExpression,
  newUser,
  getUser,
  updateUser
};
