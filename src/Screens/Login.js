import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

import { useGoogleAuth } from "../Components/AuthG";
import { userApi, AuthApi } from "../api";

const Login = () => {
  const { signIn, signOut, isSignedIn } = useGoogleAuth();
  const history = useHistory();

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
      const {
        data: { success, msg, id_token }
      } = await userApi.ssoGLogin(userInfo);

      if (success) {
        AuthApi.setToken(id_token);
        history.push("/");
      } else {
        alert(msg);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onSubmit = e => {
    if (e) {
      e.preventDefault();
    }
  };

  return (
    <Box>
      <Helmet>
        <title>LOGIN | WTB</title>
      </Helmet>
      <Form onSubmit={onSubmit}>
        <LoginInput type="email" placeholder="Enter Your Email" />
        <LoginInput type="text" placeholder="Enter Your Password" />
        <ButtonSection>
          <Button type="submit">Log In</Button>
          <SLink to={`/singup`}>
            <Button>Sing Up</Button>
          </SLink>
          <Button onClick={LogIn}>구글 로그인</Button>
        </ButtonSection>
      </Form>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  width: 500px;
  height: 500px;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`;

const LoginInput = styled.input`
  all: unset;

  width: 80%;

  margin-bottom: 30px;
  text-align: center;

  border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
`;

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;

const SLink = styled(Link)``;

export default Login;
