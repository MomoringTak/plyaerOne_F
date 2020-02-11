import React from "react";
import styled from "styled-components";
import { useGoogleAuth, CheckSignedIn } from "./AuthG";

const GoogleLoginButton = () => {
  const { signIn } = useGoogleAuth();
  return (
    <>
      <CheckSignedIn />
    </>
  );
};

export default GoogleLoginButton;
