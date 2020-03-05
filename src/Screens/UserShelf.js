import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, Route, Redirect, useHistory } from "react-router-dom";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { userApi, booklistApi, AuthApi } from "../api";

import Table from "../Components/Table";
import List from "../Components/List";

const UserShelf = () => {
  const history = useHistory();
  const googleAuth = useGoogleAuth();
  const { googleUser } = useGoogleAuth();
  // 20200305
  // 유저 정보를 받아옴. AuthG Context에서
  // const user = useUserAuth();
  // console.log(user.isLogin);

  const [user, setUser] = useState({});
  const [booklist, setBooklist] = useState([]);

  const valid = useIsValid();

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
  };

  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const deleteBL = async item => {
    try {
      const {
        data: {
          booklist: { booklists }
        }
      } = await booklistApi.deleteBookList(item, googleUser.googleId);
      const NEW_BL = booklists.map(item => {
        item.userBL = true;
        return item;
      });
      setBooklist(NEW_BL);
    } catch (e) {
      console.log(e);
    }
  };

  const showBookList = async () => {
    try {
      if (user.length !== 0) {
        const {
          data: { booklist }
        } = await booklistApi.getBookList(user.googleId);
        const NEW_BL = booklist.booklists.map(item => {
          item.userBL = true;
          return item;
        });
        setBooklist(NEW_BL);
      }
    } catch (err) {
      if (err.response !== undefined) AuthApi.checkAuth(err.response.data);
    }
  };

  // User 정보가 업데이트 된 경우. 북 리스트를 갱신
  // 20200305
  useEffect(() => {
    getUser();
    showBookList();
  }, []);

  return (
    <Container>
      <h1>{user.nickname}</h1>
      {/* <SLink to={`/${user.email}/addbooklist`}>
        <AddBook>Add BookList</AddBook>
      </SLink> */}
      <Table>
        {booklist ? (
          booklist.map(item => (
            <List
              key={item._id}
              booklist={item}
              clickBooklist={booklistDetail}
              deleteBL={deleteBL}
            />
          ))
        ) : (
          <h1>Empty BookList</h1>
        )}
      </Table>
    </Container>
  );
};

const Container = styled.div``;

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;

const AddBook = styled.button`
  position: absolute;
  padding: 5px;
  height: 20px;
  border: 1px solid black;
  border-radius: 5px;
  top: 10px;
  left: 10px;
`;

export default UserShelf;
