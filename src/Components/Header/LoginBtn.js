import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import { useGoogleAuth } from "../AuthG";

import { userApi, AuthApi } from "../../api";

const LoginBtn = () => {
  const { signIn, signOut, isSignedIn } = useGoogleAuth();

  //Method : Login Process.
  async function LogIn() {
    try {
      //get the data of googleId, name, email from the one who logged in.
      const {
        profileObj: { googleId, name, email }
      } = await signIn();

      const userInfo = {
        googleId,
        name,
        email
      };

      //CreateOrFind the user who logged In.
      const {
        data: {
          success,
          msg,
          id_token
        }
      } = await userApi.ssoGLogin(userInfo);

      if(success) {
        AuthApi.setToken(id_token);
      }
      else {
        alert(msg);
        // return <Redirect to="/" />;
        //AuthApi.goToHome();
      }

    } catch (e) {
      console.log(e);
    } finally {
      console.log("The end of Login Process");
    }
  }

  // 로그아웃 시, 구글 signOut 펑션을 함께 넘겨줌.
  // 토큰 삭제
  // 20200305
  function LogOut() {
    AuthApi.clearToken(signOut);
  }

  return (
    <>
      {isSignedIn ? (
        <UserLink to="#" onClick={LogOut}>로그아웃</UserLink>
      ) : (
        <UserLink to="#" onClick={LogIn}>로그인</UserLink>
      )}
    </>
  );
};

const UserLink = styled(Link)`
  float:left;
  line-height:32px;
  padding-left:10px;
  color:#da3e58;
  font-weight:500;
  font-family: 'Noto Sans';
`;

// const LogInBtnCotainer = styled.div`
//   line-height:32px;
// `;

export default LoginBtn;
