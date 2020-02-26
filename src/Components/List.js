import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { booklistApi } from "../api";

const List = ({ booklist, clickBooklist, deleteBL }) => {
  const clickEvent = e => {
    clickBooklist(booklist._id);
  };

  const clickDelete = e => {
    deleteBL(booklist._id);
  };

  console.log(booklist.userBL);

  return (
    <Container>
      <>
        <Title onClick={clickEvent}>북리스트 : {booklist.title}</Title>

        <DeleteBtn onClick={clickDelete}>삭제</DeleteBtn>
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
