import React from "react";
import styled from "styled-components";

import { Link, withRouter } from "react-router-dom";

import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button, Columns, Container } from "react-bulma-components";

const SignUp = () => {
  const onSubmit = e => {
    if (e) {
      e.preventDefault();
    }
  };

  return (
    <Box>
      <Container>
        <Columns>
          <Columns.Column></Columns.Column>
          <Columns.Column size="two-thrids">
            회원가입
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
          </Columns.Column>
          <Columns.Column></Columns.Column>
        </Columns>
      </Container>
    </Box>
  );
};

const Box = styled.div`
  border: 1px solid;
  width: 100%;
  height: 60vh;
  min-height: 540px;
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

const SLink = styled(Link)``;

export default SignUp;
