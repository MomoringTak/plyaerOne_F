import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import { Link, useHistory } from "react-router-dom";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";

import { userApi } from "../api";

export default function EditProfile() {
  const googleAuth = useGoogleAuth();
  const valid = useIsValid();
  const history = useHistory();

  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [changed, setChanged] = useState(true);

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
  };

  const handleSubmit = async e => {
    if (e) {
      e.preventDefault();
    }
    if (name !== "") {
      setChanged(false);
      const userInfo = {
        email: user.email,
        nickname: name
      };
      await userApi.updateUser(userInfo);
    }
  };

  const updateName = e => {
    const {
      target: { value }
    } = e;
    setName(value);
  };

  const updateAgain = () => {
    setChanged(true);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container>
      <Helmet>
        <title>EDIT PROFILE | WTB</title>
      </Helmet>
      <Header>
        <Title>닉네임 수정</Title>
        <Spacer style={{ height: "100px" }} />
        <Section>
          <Spacer />
          {changed ? (
            <>
              <h3>새로운 닉네임을 입력해주세요.</h3>
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
              <h1>새로 입력하신 닉네임 : {name}</h1>
              <SLink to={`/${user.nickname}/profile`}>
                마이페이지로 돌아가기
              </SLink>
            </>
          )}
          <Spacer />
          {!changed && (
            <button style={{ color: "#4a6ee0" }} onClick={updateAgain}>
              다시 수정하시겠습니까?
            </button>
          )}
        </Section>
      </Header>
    </Container>
  );
}

const Container = styled.div``;

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
