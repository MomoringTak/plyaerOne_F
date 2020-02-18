import React, { useState } from "react";
import styled from "styled-components";
import { bookApi } from "../api";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [clickedBook, setClickedBook] = useState(0);
  const [term, setTerm] = useState("");
  const [book, setBook] = useState([]);

  async function showBook() {
    let display = 10;
    try {
      const { data: bookResults } = await bookApi.getBook(term, display);

      const newBook = bookResults.map(item => {
        item.selected = false;
        item.title = item.title.replace(/(<([^>]+)>)/gi, "");
        item.author = item.author.replace(/(<([^>]+)>)/gi, "");
        item.description = item.description.replace(/(<([^>]+)>)/gi, "");

        return item;
      });

      setBook(newBook);
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

    //새로 검색 시 RESET
    setBook([]);
    setClickedBook(0);
  };

  const pickBook = () => {
    const newbook = book.filter(item => item.selected === true);
    console.log(newbook);
  };

  const selectedBook = bookItem => {
    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;
    setBook(book);
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
              {clickedBook > 0 ? (
                <>
                  <BookNum>추가 할 책 갯수 : {clickedBook}</BookNum>
                  <Add onClick={pickBook}>책 추가</Add>
                </>
              ) : null}
              {book && book.length > 0 && (
                <Section title="Book Results">
                  {book.map(bookItem => (
                    <Book
                      key={bookItem.isbn}
                      bookItem={bookItem}
                      clickBook={selectedBook}
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

const Template = styled.div`
  position: relative;
`;

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

const BookNum = styled.span`
  font-size: 1rem;
  left: 100px;
`;

const Add = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid blue;
  text-align: center;
  font-size: 1rem;
  margin-left: 50px;
`;
