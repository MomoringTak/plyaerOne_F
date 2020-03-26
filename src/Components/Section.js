import React from "react";
import styled from "styled-components";

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    {/* <Grid>{children}</Grid> */}
    {children}
  </Container>
);

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
  &:after{
    content:""; 
    display:block;
    clear:both;
  }
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

// const Grid = styled.div`
//   margin-top: 25px;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, 125px);
//   grid-gap: 25px;
// `;

export default Section;
