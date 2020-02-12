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
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">Home</SLink>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">Search</SLink>
        </Item>

        {isSignedIn && (
          <Item current={pathname === "/shelf"}>
            <SLink to="/shelf">Shelf</SLink>
          </Item>
        )}
        {isSignedIn && (
          <Item current={pathname === "/profile"}>
            <SLink to="/profile">Profile</SLink>
          </Item>
        )}
        {isSignedIn && (
          <Item current={pathname === "/addbook"}>
            <SLink to="/addbook">+Book</SLink>
          </Item>
        )}
        <LogInBtnCotainer isSignedIn>
          <div>
            {isSignedIn ? (
              <Container>
                <Title>{googleUser.profileObj.name}</Title>
                <Title>{googleUser.profileObj.email}</Title>
                <button onClick={signOut}>Sign Out</button>
              </Container>
            ) : (
              <button onClick={signIn}>Sign in with Google</button>
            )}
          </div>
        </LogInBtnCotainer>
      </List>
    </Header>
  );
});

const Header = styled.header`
  color: black;
  position: fixed;
  top: 0;
  left: 25%;
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: white;
  margin-top: 20px;
  border-radius: 5px;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 50px;
  text-align: center;
  border-bottom: 5px solid ${props => (props.current ? "black" : "transparent")};
  transition: border-bottom 0.3s ease-in-out;
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogInBtnCotainer = styled.div`
  position: absolute;
  right: 10px;
  top: 25%;
  display: flex;
  align-items: center;
`;

const Container = styled.div``;
const Title = styled.h1``;
