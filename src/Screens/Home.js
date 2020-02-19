import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { bookApi } from "../api";
import Book from "../Components/Book";
import Section from "../Components/Section";

export default function Home() {
  const [book, setBook] = useState([]);

  const showBook = async () => {
    try {
      const {
        data: { books }
      } = await bookApi.getAllBook();
      setBook(books);
    } catch (e) {
      console.log(e);
    }
  };

  const bookDetail = item => {
    console.log(item);
  };

  useEffect(() => {
    showBook();
  }, []);

  return (
    <Container>
      <Card>
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
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-left: 200px;
  height: 100vh;
`;

const Card = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
`;
