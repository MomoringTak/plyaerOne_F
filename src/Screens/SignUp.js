import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import { Link } from "react-router-dom";

const SignUp = () => {
  const onSubmit = e => {
    if (e) {
      e.preventDefault();
    }
  };

  return (
    <Box>
      <Helmet>
        <title>SINGUP | WTB</title>
      </Helmet>
      <Form onSubmit={onSubmit}>
        <LoginInput type="email" placeholder="Email" />
        <LoginInput type="text" placeholder="Password" />
        <LoginInput type="text" placeholder="Re-Enter Your Password" />
        <LoginInput type="email" placeholder="Name" />
        <LoginInput type="email" placeholder="Age" />
        <LoginInput type="email" placeholder="Gender" />
        <ButtonSection>
          <SLink to={`/singup`}>
            <Button color="danger">Submit</Button>
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
  width: 50%;
  height: 20%;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  all: unset;
`;

const SLink = styled(Link)``;

export default SignUp;
