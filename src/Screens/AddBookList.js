import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link, useHistory } from "react-router-dom";

import { bookApi, booklistApi } from "../api";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";

const AddBookList = () => {
  const [next, setNext] = useState(true);
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [clickedBook, setClickedBook] = useState(0);
  const [term, setTerm] = useState("");
  const [book, setBook] = useState([]);

  const [user, setUser] = useState([]);
  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const { googleUser } = useGoogleAuth();

  const history = useHistory();

  const showBook = async () => {
    try {
      const {
        data: { books: bookResult }
      } = await booklistApi.serachBook(term);
      setBook(bookResult);
    } catch (e) {
      history.push(`/`);
      console.log(e);
    }
  };

  const selectedBook = bookItem => {
    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;
    setBook(book);
  };

  const pickBook = async () => {
    const newBook = book.filter(item => item.selected === true);

    const leftOne = ({ _id, ...rest }) => _id;

    const BookId = newBook.map(item => leftOne(item));

    const Final_Booklist = {
      title: title,
      books: BookId,
      userId: user._id
    };

    await booklistApi.uploadBookList(Final_Booklist);
    history.push(`/${user.nickname}/shelf`);
  };

  const handleTitle = e => {
    if (e) {
      e.preventDefault();
    }
    if (title !== "") {
      setNext(false);
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

  const updateTitle = e => {
    const {
      target: { value }
    } = e;
    setTitle(value);
  };

  const updateTerm = e => {
    const {
      target: { value }
    } = e;
    setTerm(value);

    setBook([]);
    setClickedBook(0);
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
        <title>ADD BOOKLIST | WTB</title>
      </Helmet>
      {next ? (
        <Form onSubmit={handleTitle}>
          <Template>
            <Input
              placeholder="생성 할 북리스트 이름을 작성해주세요."
              value={title}
              onChange={updateTitle}
            />
          </Template>
        </Form>
      ) : (
        <>
          <AddBookForm
            onSubmit={handleSubmit}
            value={term}
            onChange={updateTerm}
          >
            <Search placeholder="추가할 책을 검색 해주세요." />
          </AddBookForm>
          {loading ? (
            <Loader />
          ) : (
            <>
              {clickedBook > 0 ? (
                <>
                  <BookNum>북 리스트에 추가 할 책 갯수 : {clickedBook}</BookNum>
                  <Add onClick={pickBook}>책 추가 선정 완료</Add>
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
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBookForm = styled.form`
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Template = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  all: unset;
  width: 300px;
  border-bottom: 1px solid black;
  text-align: center;
  padding: 10px;
`;

const Search = styled.input`
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
  height: 50px;
  border: 1px solid blue;
  text-align: center;
  font-size: 1rem;
  margin-left: 50px;
  padding: 10px;
`;

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;

const Spacer = styled.div`
  height: 15px;
`;

const Header = styled.div`
  font-weight: 500;
  color: #8189a9;
`;

export default AddBookList;
