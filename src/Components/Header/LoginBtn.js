import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useGoogleAuth } from "../AuthG";

import { userApi } from "../../api";

const LoginBtn = () => {
  const { signIn, signOut, isSignedIn, googleUser } = useGoogleAuth();

  //Method : Login Process.
  async function LogIn() {
    try {
      //get the data of googleId, name, email from the one who logged in.
      const {
        profileObj: { googleId, name, email }
      } = await signIn();

      const userInfo = {
        googleId,
        name,
        email
      };

      //CreateOrFind the user who logged In.
      await userApi.newUser(userInfo);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("The end of Login Process");
    }
  }

  return (
    <LogInBtnCotainer>
      {isSignedIn ? (
        <Container>
          <button onClick={signOut}>
            <SLink to={`/`}>Log Out</SLink>
          </button>
        </Container>
      ) : (
        <button onClick={LogIn}>Sign in with Google</button>
      )}
    </LogInBtnCotainer>
  );
};

const Container = styled.div``;

const SLink = styled(Link)`
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

const Title = styled.h1`
  margin-top: -20px;
  font-weight: 300;
  font-size: 0.6rem;
`;

export default LoginBtn;
