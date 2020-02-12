import React, { useState, useContext } from "react";
import { useGoogleLogin } from "react-use-googlelogin";

const clientID =
  "563473472310-ih69dhvqsbl37b20ic312v96nqlvfjr9.apps.googleusercontent.com";

const GoogleAuthContext = React.createContext(); // Not necessary, but recommended.

const useGoogleAuth = () => React.useContext(GoogleAuthContext);

const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: clientID
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {/* The rest of your app */}
      {children}
    </GoogleAuthContext.Provider>
  );
};

export default GoogleAuthProvider;

export { GoogleAuthContext, useGoogleAuth };
