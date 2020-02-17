import React from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

import GoogleAuthProvider from "./AuthG";

const App = () => {
  return (
    <GoogleAuthProvider>
      <Router />
      <GlobalStyles />
    </GoogleAuthProvider>
  );
};

export default App;
