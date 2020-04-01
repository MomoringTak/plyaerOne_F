import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <Message>Something went wrong...</Message>
      <Message>
        <SLink to={`/`}>Go back to Home</SLink>
      </Message>
    </div>
  );
};

export default PageNotFound;

const Message = styled.h2`
  text-align: center;
`;

const SLink = styled(Link)`
  display: block;
  margin-top: 10px;
  color: #4a6ee0;
`;
