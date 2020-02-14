import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth } from "../AuthG";
import { newUser } from "../../api";

import LoginBtn from "./LoginBtn";

export default withRouter(({ location: { pathname } }) => {
  const { signIn, signOut, isSignedIn, googleUser } = useGoogleAuth();
  if (googleUser) {
    // console.log(googleUser);
    // console.log(googleUser.profileObj.googleId);
  }

  async function LogIn() {
    try {
      const userData = await signIn();
      let rest = await newUser(userData.googleId);
      console.log(rest);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Inserted DB");
    }
  }

  return (
    <Header>
      <Logo>
        <SLink to="/">Nomathon</SLink>
      </Logo>
      <LogInBtnCotainer>
        {isSignedIn ? (
          <Container>
            <button onClick={signOut}>
              <SLink to={`/`}>Log Out</SLink>
            </button>
            <Title>{googleUser.profileObj.name}</Title>
          </Container>
        ) : (
          <button onClick={LogIn}>Sign in with Google</button>
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
              <SLink to={`/${googleUser.profileObj.email}/shelf`}>
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
  border-radius: 2px;
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
  margin-bottom: 30px;
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
  margin-top: -20px;
  font-weight: 300;
  font-size: 0.6rem;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  font-size: 2rem;
`;
