import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import InputText from "../Components/Style/InputText";
import { Box, Form, SignButton } from "../Components/Style/Sign";
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

export default AddGoogleUserInfo;

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
