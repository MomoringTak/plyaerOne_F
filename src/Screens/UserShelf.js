import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { booklistApi, AuthApi } from "../api";

import Table from "../Components/Table";
import List from "../Components/List";

const UserShelf = ({
  location: { pathname },
  match: {
    params: { userNickname }
  }
}) => {
  const history = useHistory();
  const googleAuth = useGoogleAuth();

  const [user, setUser] = useState({});
  const [booklist, setBooklist] = useState([]);
  const valid = useIsValid();

  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const deleteBL = async item => {
    try {
      const {
        data: {
          booklist: { booklists }
        }
      } = await booklistApi.deleteBookList(item, user.email);
      const NEW_BL = booklists.map(item => {
        item.userBL = true;
        return item;
      });
      setBooklist(NEW_BL);
    } catch (e) {
      console.log(e);
    }
  };

  const progress = async () => {
    const logger = booklist.books.map(book => {
      const singleLogger = {
        book: book._id,
        user: user
      };
      return singleLogger;
    });

    const {
      data: { logDataResult }
    } = await booklistApi.getAllReadLog(logger);
  };

  const showBookList = async user => {
    try {
      if (user.length !== 0) {
        const {
          data: {
            booklist: { booklists }
          }
        } = await booklistApi.getBookList(user.email);

        const NEW_BL = booklists.map(item => {
          item.userBL = true;
          return item;
        });
        setBooklist(NEW_BL);
      }
    } catch (err) {
      if (err.response !== undefined) AuthApi.checkAuth(err.response.data);
    }
  };

  const getUser = async () => {
    //주소 닉네임 아이디 출력
    //아이디출력에 따라서 해당 유저 책장이 달라보여야됨. 2020.03.31
    console.log(userNickname);
    const authorized = await valid(googleAuth);
    setUser(authorized);
    showBookList(authorized);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <h1>{user.nickname}</h1>

      <SLink to={`/${user.email}/addbooklist`}>
        <AddBook>책장 생성하기</AddBook>
      </SLink>
      <Table>
        {booklist.length >= 1 ? (
          booklist.map(item => (
            <List
              key={item._id}
              booklist={item}
              clickBooklist={booklistDetail}
              deleteBL={deleteBL}
              user={user._id}
            />
          ))
        ) : (
          <h1>책장이 비어져있습니다.</h1>
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
