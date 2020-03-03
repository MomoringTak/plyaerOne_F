import axios from "axios";
import { useGoogleAuth } from "./Components/AuthG";

const api = axios.create({
  baseURL: "http://localhost:8008"
});

//Book API
export const bookApi = {
  addToBooklist: (bookId, booklistId) =>
    api.post(`books/addbook-to-booklist/${bookId}/${booklistId}`),
  getBook: (title, display) => api.get(`/books/${title}/${display}`),
  addBook: book => api.post(`/books/upload`, book),
  getAllBook: () => api.get(`/books/`),
  getBookDetail: id => api.get(`/books/${id}`)
};

//User API
export const userApi = {
  ssoGLogin: userInfo => api.post(`/users/add`, userInfo),
  getUser: googleId => api.get(`/users/${googleId}`),
  updateUser: (googleId, nickname) =>
    api.patch(`/users/${googleId}`, { nickname: nickname })
};

export const booklistApi = {
  serachBook: title => api.get(`/booklists/${title}`),
  addBookList: booklist => api.post(`/booklists/upload`, booklist),
  getBookList: googleId => api.get(`/booklists`, { params: { googleId: googleId }, headers: AuthApi.getAuthHeader() }),
  getOneBookList: id => api.get(`/booklists/item/${id}`),
  deleteBookList: (id, googleId) =>
    api.delete(`/booklists/delete`, {
      params: {
        id: id,
        googleId: googleId
      }
    }),
  getBooks: id => api.get(`/booklists/detail/${id}`)
};

//Comment API
export const commentApi = {
  commentBook: data => api.post("/books/comment", data),
  bookComment: id => api.get(`/comments/${id}`),
  deleteComment: (id, bookId) =>
    api.delete("/comments/delete", { params: { id: id, bookId: bookId } })
};


export const AuthApi = {
  getToken: () => {
    return JSON.parse(localStorage.getItem('wtbUser'));
  },
  setToken: (token) => {
    localStorage.setItem('wtbUser', JSON.stringify(token));
  },
  clearToken: () => {
    localStorage.removeItem('wtbUser');
    useGoogleAuth.signOut();
  },
  getAuthHeader: () => {
      const token = AuthApi.getToken();
      if (token) {
        return {Authorization: `Bearer ${token}`};
      } else {
        return {};
      }
  },
  checkAuth: (data) => {
    if(!data.success){
      if(data.err.name === "JsonWebTokenError"){
        alert("인증에러");
        if (window !== undefined) {
          window.location.href = '/';
        }
        return false;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  }

}