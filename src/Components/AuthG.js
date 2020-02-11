import React, { useState, useContext } from "react";
import { useGoogleLogin } from "react-use-googlelogin";
import LogContextProvider from "./CheckLog";

const GoogleAuthContext = React.createContext(); // Not necessary, but recommended.

const clientID =
  "563473472310-n01hbhhncn59p7mp09nf1mn775jrd1bb.apps.googleusercontent.com";

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: clientID
  });

  const { isSignedIn } = useGoogleLogin({
    clientId: clientID
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {/* The rest of your app */}
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const CheckSignedIn = () => {
  const { signIn } = useGoogleAuth();
  const { isSignedIn, signOut } = useGoogleLogin({
    clientId: clientID
  });
  console.log(`AuthG login : ${isSignedIn}`);
  return (
    <div>
      {isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default clientID;
