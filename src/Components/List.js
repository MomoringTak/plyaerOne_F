import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { booklistApi } from "../api";

const List = ({ booklistId }) => {
  const [blist, setBlist] = useState([]);

  const showBooklist = async () => {
    try {
      const {
        data: { result }
      } = await booklistApi.getOneBookList(booklistId);
      console.log(result);
      setBlist(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    showBooklist();
  }, []);

  return (
    <Container>
      <Title>북리스트 : {blist.title}</Title>
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
`;

const Title = styled.span``;

export default List;
