import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, AuthApi } from "../api";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";
import Helmet from "react-helmet";

export default function AddBook() {
  const [loading, setLoading] = useState(false);
  const [clickedBook, setClickedBook] = useState(0);
  const [finalBook, setFinalBook] = useState(0);
  const [term, setTerm] = useState("");
  const [book, setBook] = useState([]);

  const [user, setUser] = useState({});
  const [placeholder, setPlaceholder] = useState(
    "정말 읽었었던 책 제목을 입력 해주세요"
  );

  const history = useHistory();

  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const showBook = async () => {
    //검색되는 책 숫자 === display

    let display = 10;
    try {
      const {
        data: { success, bookResults }
      } = await bookApi.getBook(term, display);
      if (success) {
        const newBook = bookResults.map(item => {
          item.selected = false;
          item.title = item.title.replace(/(<([^>]+)>)/gi, "");
          item.author = item.author.replace(/(<([^>]+)>)/gi, "");
          item.description = item.description.replace(/(<([^>]+)>)/gi, "");
          item.difficulty = 1;
          item.time = 1;
          item.complete = false;
          return item;
        });

        setBook(newBook);
      } else {
        history.push(`/404`);
      }
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
    const newBook = book.filter(item => item.complete === true);
    for (let item of newBook) {
      item.selected = false;
    }

    const newBookData = {
      newBook,
      user: user._id
    };

    const {
      data: { success }
    } = await bookApi.addBook(newBookData);
    if (success) {
      reset();
      setTerm("");
      setFinalBook(0);
      setPlaceholder("추가 희망 시 다시 검색해주세요.");
    } else {
      history.push(`/404`);
    }
  };

  const selectedBook = bookItem => {
    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;

    setBook(book);
    setFinalBook(
      book.filter(x => x.complete === true && x.selected === true).length
    );
  };

  const completeBook = bookItem => {
    book.filter(x => x.isbn === bookItem.isbn)[0] = bookItem;
    setBook(book);

    setFinalBook(
      book.filter(x => x.complete === true && x.selected === true).length
    );
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
          {finalBook > 0 ? (
            <>
              <BookNum>선택한 책 # : {finalBook}</BookNum>
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
            <Section title="책 검색이 완료되었습니다">
              {book.map(bookItem => (
                <Book
                  key={bookItem.isbn}
                  bookItem={bookItem}
                  clickBook={selectedBook}
                  recordBook={completeBook}
                  addBook={true}
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
  display: block;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  > span {
    font-weight: 400;
  }
`;

const Add = styled.button`
  padding: 8px 20px;
  text-align: center;
  color: #fff;
  float: right;
  font-size: 13px;
  font-weight: 600;
  background: #da3e58;
  margin-top: -20px;
  &:hover {
    opacity: 0.8;
  }
  border-radius: 15px;
`;
