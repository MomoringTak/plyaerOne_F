import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 32px;
  margin-top: 20px;
`;

export default () => (
  <Container role="img" aria-label="Loading">
    <span>책을 불러오는 중.</span>
  </Container>
);
