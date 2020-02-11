import React, { useState, useReducer, useContext } from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

import LogContextProvider from "./CheckLog";

const App = () => {
  return (
    <LogContextProvider>
      <Router />
      <GlobalStyles />
    </LogContextProvider>
  );
};

export default App;
