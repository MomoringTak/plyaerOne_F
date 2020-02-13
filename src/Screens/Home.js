import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: black;
  margin-left: 200px;
  height: 100vh;
`;

const Card = styled.div`
  width: 90%;
  height: 500px;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
`;

export default function Home() {
  return (
    <Container>
      <Card>
        <h1>Home</h1>
      </Card>
    </Container>
  );
}
