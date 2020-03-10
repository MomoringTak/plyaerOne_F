import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useGoogleAuth } from "../AuthG";

import { AuthApi } from "../../api";

const LoginBtn = () => {
  const { signOut, isSignedIn } = useGoogleAuth();

  const isTokenExist = AuthApi.getToken();

  const LogOut = () => {
    AuthApi.clearToken(signOut);
  };

  return (
    <>
      {isSignedIn || isTokenExist != null ? (
        <UserLink to="#" onClick={LogOut}>
          로그아웃
        </UserLink>
      ) : (
        <UserLink to="/login">로그인</UserLink>
      )}
    </>
  );
};

const UserLink = styled(Link)`
  float: left;
  line-height: 32px;
  padding-left: 10px;
  color: #da3e58;
  font-weight: 500;
  font-family: "Noto Sans";
`;

export default LoginBtn;
