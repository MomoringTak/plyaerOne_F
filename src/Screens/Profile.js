import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";

export default function Profile() {
  const [user, setUser] = useState({});
  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
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

          <Spacer />
        </Section>
      </Head>
    </Container>
  );
}

const Container = styled.div``;

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
