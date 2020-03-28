import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { userApi } from "../api";

const AddGoogleUserInfo = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const [user, setUser] = useState({});

  const onSubmit = async userInfo => {
    userInfo.userId = user._id;

    try {
      await userApi.ssoGdetail(userInfo);
      history.push("/addbook");
    } catch (err) {
      alert(err);
    }
  };

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
    if (authorized.gender !== undefined) {
      history.push(`/addbook`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
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

        <ButtonSection>
          {/* <SLink to={`/singup`}> */}
          <Button>Submit</Button>
          {/* </SLink> */}
        </ButtonSection>
      </Form>
    </Box>
  );
};

export default AddGoogleUserInfo;

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
