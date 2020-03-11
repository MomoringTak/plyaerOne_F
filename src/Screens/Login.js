import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";

import { useGoogleAuth } from "../Components/AuthG";
import { userApi, AuthApi } from "../api";

const Login = () => {
  const { signIn } = useGoogleAuth();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const googleLogIn = async () => {
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
  };

  const onSubmit = async userInfo => {
    try {
      const {
        data: { success, msg, id_token }
      } = await userApi.wtbSignIn(userInfo);
      if (success) {
        AuthApi.setToken(id_token);
        history.push(`/`);
      } else {
        alert(msg);
      }
    } catch (e) {
      alert("유저정보가 매칭 되지 않습니다.");
    }
  };

  return (
    <Box>
      <Helmet>
        <title>LOGIN | WTB</title>
      </Helmet>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          type="email"
          placeholder="Email"
          name="email"
          ref={register}
        />
        <LoginInput
          type="text"
          placeholder="Password"
          name="password"
          ref={register}
        />
        <ButtonSection>
          <Button type="submit">로그인</Button>
          <SLink to={`/singup`}>
            <Button>회원 가입</Button>
          </SLink>
        </ButtonSection>
      </Form>
      <Gbtn onClick={googleLogIn}>구글 로그인</Gbtn>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  width: 500px;
  height: 300px;
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

const Gbtn = styled.button`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;
const SLink = styled(Link)``;

export default Login;
