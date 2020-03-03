import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, Route, Redirect, useHistory } from "react-router-dom";
import { useGoogleAuth } from "../Components/AuthG";
import { userApi, booklistApi, AuthApi } from "../api";

import Table from "../Components/Table";
import List from "../Components/List";

export default function UserShelf() {
  const history = useHistory();

  const { googleUser } = useGoogleAuth();
  const [user, setUser] = useState([]);
  const [booklist, setBooklist] = useState([]);

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

      setBooklist(booklists);
    } catch (e) {
      console.log(e);
    }
  };

  async function getUserInfo() {
    if (null !== googleUser && user.length === 0) {
      const {
        data: { user }
      } = await userApi.getUser(googleUser.googleId).catch(function(err) {
        if (err.response) {
          if (err.response.msg !== `success`) {
            return <Redirect to="/" />;
          }
        }
      });
      setUser(user);
    }
  }

  const showBookList = async () => {
    try {
      const data = await booklistApi.getBookList(googleUser.googleId);
      if(AuthApi.checkAuth(data)){
        const booklist = data.booklist;
        const NEW_BL = booklist.booklists.map(item => {
          item.userBL = true;
          return item;
        });
        setBooklist(NEW_BL);
      }
    } catch (err) {
      if(err.response !== undefined) AuthApi.checkAuth(err.response.data);
    }
  };

  useEffect(() => {
    getUserInfo();
    showBookList();
  }, [googleUser]);

  return (
    <Container>
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
}

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
