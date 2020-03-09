import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

const LinkToSingUp = () => {};

const onSubmit = e => {
  if (e) {
    e.preventDefault();
  }
};

const Login = () => {
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
            <Button color="danger">Sing Up</Button>
          </SLink>
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
