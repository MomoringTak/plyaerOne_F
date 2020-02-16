import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth } from "../Components/AuthG";

import { getUser } from "../api";

export default function Profile() {
  const { googleUser } = useGoogleAuth();
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState();

  async function getUserInfo() {
    console.log(googleUser.googleId);
    const { data: user } = await getUser(googleUser.googleId);
    console.log(user);
    setUser(user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <Card>
        <Head>
          <Title>Profile</Title>
          <Spacer style={{ height: "100px" }} />
          <Section>
            <span>Name</span>
            <Spacer />
            <h3>{user.nickname}</h3>
            <SLink to={`/${user.email}/editprofile`}>edit</SLink>
            <Spacer />
            <span>Email</span>
            <Spacer />
            <h3>{user.email}</h3>
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

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;
