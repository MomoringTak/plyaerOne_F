import React, { useState, useContext } from "react";
import { useGoogleLogin } from "react-use-googlelogin";

const clientID =
  "563473472310-n01hbhhncn59p7mp09nf1mn775jrd1bb.apps.googleusercontent.com";

export const LogContext = React.createContext();

//adding provider in header
const LogContextProvider = ({ children }) => {
  const { isSignedIn } = useGoogleLogin({
    clientId: clientID
  });

  console.log(`in Log : ${isSignedIn}`);
  return (
    <LogContext.Provider value={{ check: isSignedIn }}>
      {children}
    </LogContext.Provider>
  );
};

// adding provider in app.js
// const LogContextProvider = ({ children }) => (
//   <LogContext.Provider value={{ name: "123" }}>{children}</LogContext.Provider>
// );

export default LogContextProvider;
