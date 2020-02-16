import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useGoogleAuth } from "../AuthG";
import { newUser } from "../../api";

const LoginBtn = () => {
  const { signIn, signOut, isSignedIn, googleUser } = useGoogleAuth();
  async function LogIn() {
    try {
      const {
        profileObj: { googleId, name, email }
      } = await signIn();
      const userInfo = {
        googleId,
        name,
        email
      };
      await newUser(userInfo);
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
          <Title>{googleUser.profileObj.name}</Title>
        </Container>
      ) : (
        <button onClick={LogIn}>Sign in with Google</button>
      )}
    </LogInBtnCotainer>
  );
};

const Container = styled.div``;

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

const Title = styled.h1`
  margin-top: -20px;
  font-weight: 300;
  font-size: 0.6rem;
`;

export default LoginBtn;
