import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

export default function Shelf() {
  return (
    <Container>
      <Helmet>
        <title>SHELF | WTB</title>
      </Helmet>
      <h1>Shelf</h1>
    </Container>
  );
}

const Container = styled.div``;
