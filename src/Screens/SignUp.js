import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { userApi, AuthApi } from "../api";

const SignUp = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async userInfo => {
    try {
      const {
        data: {
          success,
          msg,
          id_token,
          userResult: { doc }
        }
      } = await userApi.wtbSignUp(userInfo);
      if (success) {
        AuthApi.setToken(id_token);
        if (doc.newbie) history.push(`/addbook`);
        else history.push(`/`);
      } else {
        alert(msg);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Box>
      <Helmet>
        <title>SIGN UP | WTB</title>
      </Helmet>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          type="email"
          placeholder="이메일"
          name="email"
          ref={register}
          required
        />
        <LoginInput
          type="password"
          placeholder="비밀번호"
          name="password"
          ref={register}
          required
        />
        <LoginInput
          type="text"
          placeholder="닉네임"
          name="nickname"
          ref={register}
          required
        />
        <Gender>
          <legend>성별을 골라주세요</legend>
          <input
            id="male"
            type="radio"
            value="male"
            name="gender"
            ref={register}
            defaultChecked
          />
          <label htmlFor="male">남자</label>
          <input
            id="femlae"
            type="radio"
            value="female"
            name="gender"
            ref={register}
          />
          <label htmlFor="female">여자</label>
        </Gender>

        <ButtonSection>
          {/* <SLink to={`/singup`}> */}
          <Button>완료</Button>
          {/* </SLink> */}
        </ButtonSection>
      </Form>
    </Box>
  );
};

const Gender = styled.fieldset``;

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
  width: 50%;
  height: 20%;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  all: unset;
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
`;

const SLink = styled(Link)``;

export default SignUp;
