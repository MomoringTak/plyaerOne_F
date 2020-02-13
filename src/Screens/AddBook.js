import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  color: black;
  margin-left: 200px;
`;

export default function AddBook() {
  return (
    <Container>
      <h1>AddBook</h1>
    </Container>
  );
}
