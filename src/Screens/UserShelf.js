import React from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";

export default function UserShelf() {
  return (
    <Container>
      <>
        <AddBook>Add BookList</AddBook>
      </>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  position: relative;

  display: flex;
  justify-content: center;

  margin-left: 200px;

  color: black;
`;

const AddBook = styled.button`
  position: absolute;
  padding: 5px;

  height: 20px;

  border: 1px solid black;
  border-radius: 5px;

  top: 10px;
  left: 10px;
`;
