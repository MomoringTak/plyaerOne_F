import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "react-use-googlelogin";
import { AuthApi } from "../api";

const clientID =
  "563473472310-ih69dhvqsbl37b20ic312v96nqlvfjr9.apps.googleusercontent.com";

const GoogleAuthContext = React.createContext(); // Not necessary, but recommended.

const useGoogleAuth = () => {
  const { googleAuth } = React.useContext(GoogleAuthContext);
  return googleAuth;
}

// UserAuth 새로 만듬
const useUserAuth = () => {
  const { userAuth } = React.useContext(GoogleAuthContext);
  return userAuth;
}


const GoogleAuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState([]);
  const googleAuth = useGoogleLogin({
    clientId: clientID
  });

  // 유저 정보를 받아오는 부분. (토큰이 있다면)
  // 20200305
  const getUserAuth = async (googleAuth) => {
    if(googleAuth.googleUser !== null) {
      setUserAuth(await AuthApi.checkLogin(googleAuth));
    }
  }
  // 20200305
  useEffect(() => {
    getUserAuth(googleAuth);
  }, [googleAuth.googleUser, googleAuth.isSignedIn]);

  return (
    <GoogleAuthContext.Provider value={{ googleAuth, userAuth }}>
      {/* The rest of your app */}
      {children}
    </GoogleAuthContext.Provider>
  );
};

export default GoogleAuthProvider;

export { GoogleAuthContext, useGoogleAuth, useUserAuth };