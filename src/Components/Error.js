import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <Container>
      <Card>
        <Message>Error</Message>
      </Card>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-left: 200px;
  height: 100vh;
`;

const Card = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
`;

const Message = styled.span`
  font-size: 4rem;
  font-weight: 800;
`;
