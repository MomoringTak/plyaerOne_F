import React from "react";
import styled from "styled-components";

export default function BookDetail() {
  return (
    <Container>
      <h1>Detail</h1>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  color: black;
  margin-left: 200px;
`;
