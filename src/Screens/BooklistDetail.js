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
      <h1>제목 : {booklist.title}</h1>
      <h1>설명 : {booklist.description}</h1>
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

const Container = styled.div``;

export default BooklistDetail;
