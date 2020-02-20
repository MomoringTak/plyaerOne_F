import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8008"
});

//Book API
export const bookApi = {
  getBook: (title, display) => api.get(`/book/${title}/${display}`),
  getBookDetail: id => api.get(`/book/${id}`),
  getRecentBook: () => api.get(`/book/recentbook`),
  postNewBook: (books) => api.post(`/book`, books),
};

//User API
export const userApi = {
  ssoGLogin: userInfo => api.post(`/user`, userInfo),
  getUser: googleId => api.get(`/user/${googleId}`),
  updateUser: (googleId, nickname) =>
    api.patch(`/user/${googleId}`, { nickname: nickname })
};

//response results 있어야됨
/*
업데이트를했을떄나 로그인했을때 실패했을떄
예외처리를 해줘야됨. 

백단에서 res.status(400)을하고
프단에서 400을 받았을시 
redirect하는 페이지로 전송 

exception으로 갔을경우 혹시 실패했을경우
알람메세지

다시 전송하게끔. 만들어줘야됨. 

도전어......
*/
