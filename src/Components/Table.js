import React from "react";
import styled from "styled-components";

const Table = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);

const Container = styled.div`
  :not(:last-child) {
    margin-top: 100px;
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const Grid = styled.div`
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Table;
