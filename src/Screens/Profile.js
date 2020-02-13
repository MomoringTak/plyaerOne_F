import React from "react";
import styled from "styled-components";

import { useGoogleAuth } from "../Components/AuthG";

const Container = styled.div`
  border: 2px solid red;
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

export default function Proifle() {
  const { googleUser } = useGoogleAuth();

  return (
    <Container>
      <Card>
        <Head>
          <Title>Profile</Title>
          <Spacer style={{ height: "100px" }} />
          <Section>
            <span>Name</span>
            <Spacer />
            <h3>{googleUser.profileObj.name}</h3>
            <Spacer />
            <span>Email</span>
            <Spacer />
            <h3>{googleUser.profileObj.email}</h3>
            <Spacer />
            <span>NickName</span>
            <Spacer />
            <h3>Undefined</h3>
            <Spacer />
          </Section>
        </Head>
      </Card>
    </Container>
  );
}
