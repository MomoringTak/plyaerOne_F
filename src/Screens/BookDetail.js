import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { bookApi } from "../api";

export default function BookDetail({
  location: { pathname },
  match: {
    params: { id }
  }
}) {
  const [book, setBook] = useState({});

  const showBook = async () => {
    const {
      data: { book: Results }
    } = await bookApi.getBookDetail(id);
    setBook(Results);
  };

  useEffect(() => {
    showBook();
  }, []);

  //디자인은 나중에
  return (
    <Container>
      <Template>
        <Item>책 제목 : {book.title}</Item>
        <Item>책 저자 : {book.author}</Item>
        <Item>출판사 : {book.publisher}</Item>
        <Item>책 설명 : {book.description}</Item>
      </Template>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 200px;

  color: black;
`;

const Template = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.span`
  margin-bottom: 10px;
`;
