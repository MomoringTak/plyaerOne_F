import React, { useState } from "react";
import styled from "styled-components";
import { bookApi } from "../api";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";

export default function AddBook() {
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

  //검색 및 추가 버튼 누를시 데이터 초기화
  const reset = () => {
    setBook([]);
    setClickedBook(0);
  };

  const updateTerm = e => {
    const {
      target: { value }
    } = e;
    setTerm(value);

    reset();
  };

  const pickBook = async () => {
    const newBook = book.filter(item => item.selected === true);
    for (let item of newBook) {
      item.selected = false;
    }
    await bookApi.addBook(newBook);
    reset();
    setTerm("책 추가가 완료 되었습니다. 추가 희망 시 다시 검색해주세요.");
  };

  const selectedBook = bookItem => {
    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;
    setBook(book);
  };

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
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
