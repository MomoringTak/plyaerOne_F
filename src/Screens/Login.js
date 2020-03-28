import React from "react";
import { Link, useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";

import { useGoogleAuth } from "../Components/AuthG";
import { userApi, AuthApi } from "../api";

import InputText from "../Components/Style/InputText";
import { Box, Form, SignButton } from "../Components/Style/Sign";

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
        data: {
          success,
          msg,
          id_token,
          userResult: { doc }
        }
      } = await userApi.ssoGLogin(userInfo);
      if (success) {
        AuthApi.setToken(id_token);
        if (doc.gender === undefined) history.push("/addtionalInfo");
        else if (doc.newbie === true) history.push(`/addbook`);
        else history.push("/");
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
        data: { success, msg, id_token, userResult }
      } = await userApi.wtbSignIn(userInfo);

      if (success) {
        AuthApi.setToken(id_token);
        if (userResult.newbie) {
          history.push(`/addbook`);
        } else history.push(`/`);
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
      <h3 className="tit_login">로그인</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          type="email"
          placeholder="이메일을 입력해주세요"
          name="email"
          ref={register}
        />
        <InputText
          type="text"
          placeholder="패스워드를 입력해주세요"
          name="password"
          ref={register}
        />
        <div>
          <SignButton type="submit" className="submit">로그인</SignButton>
          <Link to={`/singup`}>
            <SignButton className="register">회원 가입</SignButton>
          </Link>
        </div>
      </Form>
      <SignButton onClick={googleLogIn} className="google">구글 로그인</SignButton>
    </Box>
  );
};

export default Login;
