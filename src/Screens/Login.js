import React, { useState } from "react";
import { Link } from "react-router-dom";

import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button, Columns, Container } from "react-bulma-components";

import styled from "styled-components";

const Login = () => {
  return (
    <Box>
      <Container>
        <Columns></Columns>
      </Container>
    </Box>
  );
};

export default Login;

const Box = styled.div`
  border: 1px solid;
  width: 100%;
  height: 60vh;
  min-height: 540px;
`;
