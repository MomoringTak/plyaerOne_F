import axios from "axios";

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
  ssoGLogin: userInfo => api.post(`/users/googleSignIn`, userInfo),
  getUser: () =>
    api.get(`/users`, {
      headers: AuthApi.getAuthHeader()
    }),
  updateUser: userInfo => api.patch(`/users/update`, userInfo),
  wtbSignUp: userInfo => api.post(`/users/signup`, userInfo),
  wtbSignIn: userInfo => api.post(`/users/signin`, userInfo),
  deleteUser: id => api.delete(`users/delete/${id}`),
  userComment: id => api.get(`users/comment/${id}`),
  handleWish: logData => api.post(`users/wishlist`, logData),
  handleRead: logData => api.post(`users/doneRead`, logData),
  getReadLogger: logId => api.post(`users/readLogger`, logId)
};

export const booklistApi = {
  serachBook: title => api.get(`/booklists/${title}`),
  uploadBookList: booklist => api.post(`/booklists/upload`, booklist),
  getBookList: email =>
    api.get(`/booklists`, {
      params: { email: email },
      headers: AuthApi.getAuthHeader()
    }),
  getOneBookList: id => api.get(`/booklists/item/${id}`),
  deleteBookList: (id, email) =>
    api.delete(`/booklists/delete`, {
      params: {
        id: id,
        email: email
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
    return JSON.parse(localStorage.getItem("wtbUser"));
  },
  setToken: token => {
    localStorage.setItem("wtbUser", JSON.stringify(token));
  },
  clearToken: signOut => {
    localStorage.removeItem("wtbUser");
    if (signOut !== undefined) signOut();
    AuthApi.goToHome();
  },
  getAuthHeader: () => {
    const token = AuthApi.getToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  },
  checkAuth: data => {
    if (!data.success) {
      if (data.err.name === "JsonWebTokenError") {
        alert("인증에러");
        AuthApi.goToHome();
        return false;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  // 20200305
  checkLogin: async googleAuth => {
    // 1. 토큰이 있을경우
    if (AuthApi.getToken()) {
      // 토큰을 통해 로그인 체크 하기
      const {
        data: { user }
      } = await userApi.getUser().catch(function(err) {
        if (err.response) {
          alert("인증정보가 잘못됨...");
          AuthApi.clearToken(googleAuth.signOut);
          const user = { isLogin: false };
          return user;
        }
      });

      // 만약 토큰의 유저와 현재 프론트에 로그인되어있는 메일주소와 일치하지 않을경우. 토큰을 삭제시킴.
      if (
        googleAuth.googleUser.googleId !== undefined &&
        user.email !== googleAuth.googleUser.Rt.Au
      ) {
        alert("유저 정보가 잘못됨...");
        const user = { isLogin: false };
        AuthApi.clearToken(googleAuth.signOut);
        return user;
      }
      user.isLogin = true;
      return user;
    } else {
      const user = { isLogin: false };
      return user;
    }
  },
  goToHome: () => {
    if (window !== undefined) {
      window.location.href = "/";
    }
  }
};
