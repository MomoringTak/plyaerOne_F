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
        return <Redirect to="/" />;
      }

    } catch (e) {
      console.log(e);
    } finally {
      console.log("The end of Login Process");
    }
  }

  return (
    <LogInBtnCotainer>
      {isSignedIn ? (
        <Container>
          <button onClick={signOut}>
            <SLink to={`/`}>LOGOUT</SLink>
          </button>
        </Container>
      ) : (
        <button onClick={LogIn}>SIGN-IN WITH GOOGLE</button>
      )}
    </LogInBtnCotainer>
  );
};

const Container = styled.div``;

const SLink = styled(Link)`
`;

const LogInBtnCotainer = styled.div`
  position:absolute;
  right:0;
  margin-right:40px;
  line-height:30px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 0 20px;
  transition: 0.5s;
  color:#FFF;

  :hover {
    color: #333;
    background:#FFF;
  }
`;

export default LoginBtn;
