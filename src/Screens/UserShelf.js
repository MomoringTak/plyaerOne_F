import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  color: black;
`;

export default function UserShelf() {
  return (
    <Container>
      <h1>UserShelf</h1>
    </Container>
  );
}
