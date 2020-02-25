import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import { useGoogleAuth } from "../Components/AuthG";

import { userApi } from "../api";

export default function EditProfile() {
  const { googleUser } = useGoogleAuth();
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [changed, setChanged] = useState(true);

  async function getUserInfo() {
    const {
      data: { user }
    } = await userApi.getUser(googleUser.googleId).catch(function(err) {
      if (err.response) {
        if (err.response.msg !== `success`) {
          return <Redirect to="/" />;
        }
      }
    });
    setUser(user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    if (name !== "") {
      setChanged(false);
      userApi.updateUser(user.googleId, name).catch(function(err) {
        if (err.response) {
          if (err.response.msg !== `success`) {
            return <Redirect to="/" />;
          }
        }
      });
    }
  }

  function updateName(e) {
    const {
      target: { value }
    } = e;
    setName(value);
  }

  function updateAgain() {
    setChanged(true);
  }

  return (
    <Container>
      <Header>
        <Title>Edit Nickname</Title>
        <Spacer style={{ height: "100px" }} />
        <Section>
          <Spacer />
          {changed ? (
            <>
              <h3>Please Enter New nickname</h3>
              <Form onSubmit={handleSubmit}>
                <Input
                  placeholder={user.nickname}
                  value={name}
                  onChange={updateName}
                />
              </Form>
            </>
          ) : (
            <>
              <h1>New Nickname : {name}</h1>
              <SLink to={`/${user.email}/profile`}>
                Back to Profile Page
              </SLink>
            </>
          )}
          <Spacer />
          {!changed && (
            <button style={{ color: "#4a6ee0" }} onClick={updateAgain}>
              Update Again?
            </button>
          )}
        </Section>
      </Header>
    </Container>
  );
}

const Container = styled.div`
`;

const Header = styled.div`
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

const Form = styled.form``;

const Input = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  text-align: center;
  padding: 5px;
`;

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;
