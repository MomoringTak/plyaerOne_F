import React, { useContext } from "react";
import { useGoogleLogin } from "react-use-googlelogin";
import { AuthApi } from "../api";
import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const clientID =
  "563473472310-ih69dhvqsbl37b20ic312v96nqlvfjr9.apps.googleusercontent.com";

const GoogleAuthContext = React.createContext(); // Not necessary, but recommended.

const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: clientID
  });

  // 유저 정보를 받아오는 부분. (토큰이 있다면)
  // 20200305
  const getUserAuth = async googleAuth => {
    if (googleAuth.googleUser !== null) {
      return await AuthApi.checkLogin(googleAuth);
    }
  };

  if (googleAuth.googleUser !== null) {
    return (
      <GoogleAuthContext.Provider value={{ googleAuth, isValid: getUserAuth }}>
        {/* The rest of your app */}
        {children}
      </GoogleAuthContext.Provider>
    );
  } else {
    return (
      <Centered>
        <CenteredContent>
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </CenteredContent>
      </Centered>
    );
  }
};

const useGoogleAuth = () => {
  const { googleAuth } = useContext(GoogleAuthContext);
  return googleAuth;
};

// UserAuth 새로 만듬
const useIsValid = () => {
  const { isValid } = useContext(GoogleAuthContext);
  return isValid;
};

const Centered = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  overflow: auto;
`;

const CenteredContent = styled.div`
  margin: auto;
  max-height: 100%;
`;

export default GoogleAuthProvider;

export { GoogleAuthContext, useGoogleAuth, useIsValid };
