import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <Card>
        <Head>
          <Title>Login Page</Title>
          <Spacer style={{ height: "100px" }} />
          <Section>
            <Spacer />
          </Section>
        </Head>
      </Card>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-left: 200px;
  height: 100vh;
`;

const Card = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
`;

const Head = styled.div`
  margin: 20px 20px;
`;

const Title = styled.span`
  display: block;
  font-weight: 600;
  font-size: 2rem;
`;

const Spacer = styled.div`
  height: 15px;
`;

const Section = styled.div`
  font-weight: 500;
  color: #8189a9;
`;

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;
