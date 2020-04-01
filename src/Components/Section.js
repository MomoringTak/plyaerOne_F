import React from "react";
import styled from "styled-components";
import { Divider } from "../Components/Style/Common";

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Divider></Divider>
    {children}
  </Container>
);

const Container = styled.div`
  @media only screen and (max-width: 767px) {
    :not(:last-child) {
      margin-bottom: 50px;
    }
    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }

  @media only screen and (min-width: 768px) {
    :not(:last-child) {
      margin-bottom: 50px;
    }
    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
`;

const Title = styled.span`
  @media only screen and (max-width: 767px) {
    font-size: 16px;
    font-weight: 600;
  }

  @media only screen and (min-width: 768px) {
    font-size: 18px;
    font-weight: 600;
    padding: 15px 15px 0px;
    display: block;
  }
`;

export default Section;
