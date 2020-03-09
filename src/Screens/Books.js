import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import { bookApi } from "../api";
import Book from "../Components/Book";
import Section from "../Components/Section";

export default function Home() {
  const [book, setBook] = useState([]);

  //Redirecting via history neither Link or Redirect
  const history = useHistory();

  const showBook = async () => {
    try {
      const {
        data: { books }
      } = await bookApi.getAllBook().catch(function(err) {
        if (err.response) {
          if (err.response.msg !== `success`) {
            return <Redirect to="/" />;
          }
        }
      });
      setBook(books);
    } catch (e) {
      console.log(e);
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  useEffect(() => {
    showBook();
  }, []);

  return (
    <Container>
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
}

const Container = styled.div`
`;
