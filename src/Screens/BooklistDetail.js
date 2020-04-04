import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import { bookApi, booklistApi } from "../api";

import Section from "../Components/Section";
import Book from "../Components/Book";

const BooklistDetail = ({
  location: { pathname },
  match: {
    params: { id }
  }
}) => {
  const [booklist, setBooklist] = useState([]);
  const [book, setBook] = useState([]);
  const history = useHistory();

  const showBooklist = async () => {
    try {
      const {
        data: { success, booklists }
      } = await booklistApi.getBooks(id);
      if (success) {
        setBooklist(booklists);
        setBook(booklists.books);
      } else {
        history.push(`/404`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  const dummyFuntion = () => {};

  useEffect(() => {
    showBooklist();
  }, []);

  return (
    <Container>
      <div className="shelf-title">
        <span className="main-title">{booklist.title}</span>
      </div>
      <Section></Section>
      <Item className="description"></Item>
      <Item className="description">{booklist.description}</Item>
      <Section>
        {book ? (
          book.map(bookItem => (
            <Book
              key={bookItem.isbn}
              bookItem={bookItem}
              clickBook={bookDetail}
              recordBook={dummyFuntion}
            />
          ))
        ) : (
          <h1>표시 될 책이 없습니다.</h1>
        )}
      </Section>
    </Container>
  );
};

const Container = styled.div`
  .title {
    color: #3074b5;
    font-size: 21px;
    letter-spacing: -2px;
    padding-bottom: 25px;
  }

  .shelf-title {
    color: #555;
    letter-spacing: -0.2;
    display: inline-flex;
    line-height: 20px;
    .main-title {
      font-size: 2rem;
      font-weight: 600;
      margin-right: 5px;
    }
    .sub-title {
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

const Item = styled.div`
  margin-bottom: 10px;
  color: #333;
  position: relative;


  @media only screen and (max-width: 767px) {
    h1 {
      font-size: 22px;
    }
    &.description {
      color: #555;
      font-weight: 300;
      line-height: 20px;
      margin-bottom: 30px;
    }
    

  @media only screen and (min-width: 768px) {
    &.description {
      color: #555;
      font-weight: 300;
      line-height: 20px;
      padding-right: 30px;
      margin-bottom: 30px;
    }
   
  }
`;

export default BooklistDetail;
