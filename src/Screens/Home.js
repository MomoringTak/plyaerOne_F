import React, { useState } from "react";
import styled from "styled-components";
import { bookApi } from "../api";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [book, setBook] = useState([]);

  async function showBook() {
    let display = 10;
    try {
      const { data: bookResults } = await bookApi.getBook(term, display);

      bookResults.map(item => {
        item.selected = false;
        item.title = item.title.replace(/(<([^>]+)>)/gi, "");
        item.author = item.author.replace(/(<([^>]+)>)/gi, "");
        item.description = item.description.replace(/(<([^>]+)>)/gi, "");
      });

      setBook(bookResults);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    if (term !== "") {
      showBook(term);
    }
  };

  const updateTerm = e => {
    const {
      target: { value }
    } = e;
    setTerm(value);
  };

  return (
    <Container>
      <Card>
        <Template>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="제목을 입력 해주세요"
              value={term}
              onChange={updateTerm}
            />
          </Form>
          {loading ? (
            <Loader />
          ) : (
            <>
              {book && book.length > 0 && (
                <Section title="Book Results">
                  {book.map(bookItem => (
                    <Book
                      key={bookItem.isbn}
                      bookItem={bookItem}
                      bookCollection={book}
                      setBookCollection={setBook}
                    />
                  ))}
                </Section>
              )}{" "}
            </>
          )}
        </Template>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
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

const Template = styled.div``;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 80%;
  border-bottom: 0.5px solid black;
  text-align: center;
`;
