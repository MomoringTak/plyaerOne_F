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
        data: { data: booklists }
      } = await booklistApi.getBooks(id);
      setBooklist(booklists);
      setBook(booklists.books);
    } catch (e) {
      console.log(e);
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  useEffect(() => {
    showBooklist();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>{booklist.title} | WTB</title>
      </Helmet>
      <span>Title : {booklist.title}</span>
      <Section>
        {book ? (
          book.map(bookItem => (
            <Book
              key={bookItem.isbn}
              bookItem={bookItem}
              clickBook={bookDetail}
            />
          ))
        ) : (
          <h1>No Books</h1>
        )}
      </Section>
    </Container>
  );
};

const Container = styled.div``;

export default BooklistDetail;
