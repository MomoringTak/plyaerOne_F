import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, AuthApi } from "../api";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";
import Helmet from "react-helmet";

export default function AddBook() {
  const [loading, setLoading] = useState(false);
  const [clickedBook, setClickedBook] = useState(0);
  const [term, setTerm] = useState("");
  const [book, setBook] = useState([]);

  const [user, setUser] = useState({});
  const [placeholder, setPlaceholder] = useState("제목을 입력 해주세요");

  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const showBook = async () => {
    //검색되는 책 숫자 === display

    let display = 10;
    try {
      const { data: bookResults } = await bookApi.getBook(term, display);

      const newBook = bookResults.map(item => {
        item.selected = false;
        item.title = item.title.replace(/(<([^>]+)>)/gi, "");
        item.author = item.author.replace(/(<([^>]+)>)/gi, "");
        item.description = item.description.replace(/(<([^>]+)>)/gi, "");
        item.difficulty = 1;
        item.time = 0;
        item.complete = false;
        return item;
      });

      setBook(newBook);
    } catch (e) {
      console.log(e);
    }
  };

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

  const pickBook = async user => {
    const newBook = book.filter(item => item.selected === true);
    for (let item of newBook) {
      item.selected = false;
    }

    const newBookData = {
      newBook,
      user: user._id
    };

    await bookApi.addBook(newBookData);
    reset();
    setTerm("");
    setPlaceholder(
      "책 추가가 완료 되었습니다. 추가 희망 시 다시 검색해주세요."
    );
  };

  const selectedBook = bookItem => {
    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;
    setBook(book);
  };

  const completeBook = bookItem => {
    if (bookItem.complete === true) {
      console.log("complete");
      console.log(bookItem.time);
      console.log(bookItem.difficulty);
    }
  };

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>ADD BOOK | WTB</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input placeholder={placeholder} value={term} onChange={updateTerm} />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {clickedBook > 0 ? (
            <>
              <BookNum>추가 할 책 갯수 : {clickedBook}</BookNum>
              <Add
                onClick={() => {
                  pickBook(user);
                }}
              >
                책 추가
              </Add>
            </>
          ) : null}
          {book && book.length > 0 && (
            <Section title="Book Results">
              {book.map(bookItem => (
                <Book
                  key={bookItem.isbn}
                  bookItem={bookItem}
                  clickBook={selectedBook}
                  recordBook={completeBook}
                />
              ))}
            </Section>
          )}{" "}
        </>
      )}
    </Container>
  );
}

const Container = styled.div``;

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
