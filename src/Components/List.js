import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { booklistApi } from "../api";

const List = ({ booklist, clickBooklist }) => {
  const clickEvent = e => {
    clickBooklist(booklist._id);
  };

  const deleteBL = async () => {
    try {
      await booklistApi.deleteBookList(booklist._id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <>
        <Title onClick={clickEvent}>북리스트 : {booklist.title}</Title>
        <DeleteBtn onClick={deleteBL}>삭제</DeleteBtn>
      </>
    </Container>
  );
};

const Container = styled.div`
  font-size: 1rem;
  width: 80%;
  height: 100px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
  position: relative;
`;

const Title = styled.span``;

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;

  width: 50px;
  height: 50px;
`;
export default List;
