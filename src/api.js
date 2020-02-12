import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

const getBook = () => api.get(`/book`);
const getBookDetail = id => api.get(`/book/${id}`);
const getRecentBook = () => api.get(`/book/recentbook`);

// const addBook = () => api.post(``);

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

const getExpression = id => api.get(`/book/${id}/expression`);

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
  getExpression
};
