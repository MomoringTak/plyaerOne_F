import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Route, Redirect } from "react-router-dom";
import { useGoogleAuth } from "../Components/AuthG";
import { userApi } from "../api";

export default function UserShelf() {
  const { googleUser } = useGoogleAuth();
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <>
        <SLink to={`/${user.email}/addbooklist`}>
          <AddBook>Add BookList</AddBook>
        </SLink>
      </>
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
