import React from "react";
import styled from "styled-components";

const Wrapper = ({ children }) => (
  <Container>
    <Template>{children}</Template>
  </Container>
);

const Container = styled.div`
  margin: 80px auto 20px;
  box-sizing: border-box;
`;

const Template = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 30px;
  width: 100vw;

  @media only screen and (max-width: 767px) {
    //height: 500px;
  }

  @media only screen and (min-width: 768px) {
    //height: 500px;
    width: 800px;
    max-width: 100%;
  }
`;

export default Wrapper;
