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

  //디자인은 나중에 다른 기능 일단 추가 우선.
  return (
    <Container>
      <LeftContainer>
        <img
          className="bookImage"
          src={String(book.image).replace("type=m1&", "")}
          alt={book.title}
        ></img>
      </LeftContainer>
      <RightContainer>
        <Item>
          <h1>{book.title}</h1>by {book.author}
        </Item>
        <Divider></Divider>
        <Item className="description">{book.description}</Item>
        <Item className="author-wrap">
          <img
            src="https://secure.gravatar.com/avatar/f56af396b817f5a028808653642862de?s=50&amp;d=mm&amp;r=g"
            alt={book.author}
          ></img>
          <span>{book.author}</span>
        </Item>
        <Item>{book.publisher}</Item>
      </RightContainer>
      <ContentContainer>Contents</ContentContainer>
    </Container>
  );
}

const Container = styled.div``;

const LeftContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    width: 250px;
    float: left;
  }

  > img.bookImage {
    width: 100%;
  }
`;

const RightContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    padding: 0 30px;
    width: calc(100% - 250px);
    float: left;
  }
`;

const Item = styled.div`
  margin-bottom: 10px;
  color: #333;

  &.description {
    color: #555;
    font-weight: 300;
    line-height: 20px;
    padding-right: 30px;
    margin-bottom: 30px;
  }

  &.author-wrap {
    display: flex;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-right: 15px;
    }
    > span {
      width: calc(100% - 55px);
      line-height: 40px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #ccc;
  margin: 15px 0;
`;

const ContentContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  float: left;
`;
