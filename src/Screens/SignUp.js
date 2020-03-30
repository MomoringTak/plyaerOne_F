import React from "react";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";

import { userApi, AuthApi } from "../api";

import styled from "styled-components";
import InputText from "../Components/Style/InputText";
import { Box, Form, SignButton } from "../Components/Style/Sign";

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
      <h3 className="tit_login">회원가입</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          type="email"
          placeholder="이메일을 입력해주세요."
          name="email"
          ref={register}
          required
        />
        <InputText
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          ref={register}
          required
        />
        <InputText
          type="text"
          placeholder="닉네임을 입력해주세요."
          name="nickname"
          ref={register}
          required
        />
        <InputText
          type="number"
          placeholder="나이"
          name="age"
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

        <div>
          <SignButton className="submit">완료</SignButton>
        </div>
      </Form>
    </Box>
  );
};

const Gender = styled.fieldset`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
  text-align: center;

  legend {
    display: inline-block;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  label {
    display: inline-block;
    color: #333;
    font-size: 16px;
    margin-right: 10px;
  }
`;

export default SignUp;
