import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, Route, Redirect } from "react-router-dom";
import { useGoogleAuth } from "../Components/AuthG";
import { userApi, booklistApi } from "../api";

import Table from "../Components/Table";
import List from "../Components/List";

export default function UserShelf() {
  const { googleUser } = useGoogleAuth();
  const [user, setUser] = useState([]);
  const [booklist, setBooklist] = useState([]);
  async function getUserInfo() {
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

  const showBookList = async () => {
    try {
      const {
        data: { booklist }
      } = await booklistApi.getBookList(googleUser.googleId);
      setBooklist(booklist);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo();
    showBookList();
  }, []);

  return (
    <Container>
      <Card>
        <>
          <SLink to={`/${user.email}/addbooklist`}>
            <AddBook>Add BookList</AddBook>
          </SLink>
          <Table>
            {booklist ? (
              booklist.map(item => <List key={item} booklistId={item} />)
            ) : (
              <h1>Empty BookList</h1>
            )}
          </Table>
        </>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: black;

  margin-left: 200px;
  height: 100vh;
`;
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

const Card = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
  position: relative;
`;
