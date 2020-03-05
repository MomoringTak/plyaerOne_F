import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, Route, Redirect, useHistory } from "react-router-dom";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { booklistApi, AuthApi } from "../api";

import Table from "../Components/Table";
import List from "../Components/List";

const UserShelf = () => {
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
      } = await booklistApi.deleteBookList(item, user.googleId);
      const NEW_BL = booklists.map(item => {
        item.userBL = true;
        return item;
      });
      setBooklist(NEW_BL);
    } catch (e) {
      console.log(e);
    }
  };

  const showBookList = async user => {
    try {
      if (user.length !== 0) {
        const {
          data: {
            booklist: { booklists }
          }
        } = await booklistApi.getBookList(user.googleId);

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
    const authorized = await valid(googleAuth);

    setUser(authorized);
    showBookList(authorized);
  };

  useEffect(() => {
    getUser();
  }, []);

  //Refresh Paging 시 property nickname of undefined. 첫 Rendering 시 user값이 없어서 발생하는 문제
  return (
    <Container>
      <h1>{user.nickname}</h1>
      <SLink to={`/${user.email}/addbooklist`}>
        <AddBook>Add BookList</AddBook>
      </SLink>
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
