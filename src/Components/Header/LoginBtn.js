import React from "react";
import styled from "styled-components";

import { useGoogleAuth } from "../AuthG";

const LoginBtn = (valid, user) => {
  const { signIn, signOut } = useGoogleAuth();
  console.log(valid);
  console.log(user);
  return (
    <div>
      {valid ? (
        <Container>
          {/* {user && <Title>{user.profileObj.name}</Title>} */}
          <button onClick={signOut}>Sign Out!</button>
        </Container>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default LoginBtn;

const Container = styled.div``;

const Title = styled.h1``;
