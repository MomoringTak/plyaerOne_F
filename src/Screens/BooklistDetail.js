import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
      console.log(booklists.books);
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
      <Card>
        <>
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
        </>
      </Card>
    </Container>
  );
};

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

export default BooklistDetail;
