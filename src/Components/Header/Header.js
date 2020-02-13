import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth } from "../AuthG";

import LoginBtn from "./LoginBtn";

export default withRouter(({ location: { pathname } }) => {
  const { signIn, signOut, isSignedIn, googleUser } = useGoogleAuth();
  console.log(googleUser);
  return (
    <Header>
      <Logo>
        <SLink to="/">Nomathon</SLink>
      </Logo>
      <LogInBtnCotainer>
        {isSignedIn ? (
          <Container>
            <button onClick={signOut}>Log Out</button>
            <Title>{googleUser.profileObj.name}</Title>
          </Container>
        ) : (
          <button onClick={signIn}>Sign in with Google</button>
        )}
      </LogInBtnCotainer>
      <List>
        <Item>
          <SLink to="/">Home</SLink>
        </Item>
        <Item>
          <SLink to="/shelf">Shelf</SLink>
        </Item>
        <Item>
          <SLink to="/search">Search</SLink>
        </Item>

        {isSignedIn && (
          <>
            <Item>
              <SLink to={`/ ${googleUser.profileObj.email}/shelf`}>
                UserShelf
              </SLink>
            </Item>

            <Item>
              <SLink to={`/${googleUser.profileObj.email}/addbook`}>
                Add Book
              </SLink>
            </Item>
            <Item>
              <SLink to={`/${googleUser.profileObj.email}/profile`}>
                Profile
              </SLink>
            </Item>
          </>
        )}
      </List>
    </Header>
  );
});

const Header = styled.header`
  color: #c3c3c3;
  position: fixed;
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  background-color: #323439;
  border-radius: 5px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  width: 80px;
  text-align: center;
  transition: border-bottom 0.3s ease-in-out;

  :hover {
    color: white;
  }
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogInBtnCotainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid white;
  border-radius: 3px;
  padding: 10px;

  :hover {
    color: white;
  }
`;

const Container = styled.div``;
const Title = styled.h1`
  margin-top: 10px;
  font-weight: 300;
  font-size: 0.6rem;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  font-size: 2rem;
`;
