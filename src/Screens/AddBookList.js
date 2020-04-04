import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link, useHistory } from "react-router-dom";

import { bookApi, booklistApi } from "../api";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import InputText from "../Components/Style/InputText";
import { Box, Form, SignButton } from "../Components/Style/Sign";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";

const AddBookList = () => {
  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const history = useHistory();
  const [next, setNext] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [bookCollection, setBookCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const [clickedBook, setClickedBook] = useState(0);

  const [term, setTerm] = useState("");
  const [book, setBook] = useState([]);

  const [user, setUser] = useState([]);

  const showBook = async () => {
    try {
      const {
        data: { success, books: bookResult }
      } = await booklistApi.serachBook(term);
      if (success) setBook(bookResult);
      else {
        history.push(`/404`);
      }
    } catch (e) {
      history.push(`/`);
      console.log(e);
    }
  };

  const selectedBook = bookItem => {
    if (!bookItem.selected) {
      setBookCollection(prev => [...prev, bookItem]);
    } else {
      setBookCollection(prev => prev.filter(item => item._id !== bookItem._id));
    }

    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;
    setBook(book);
  };

  const completeBook = bookItem => {};

  const pickBook = async bookCollection => {
    const leftOne = ({ _id, ...rest }) => _id;

    const BookId = bookCollection.map(item => leftOne(item));

    const Final_Booklist = {
      title: title,
      description: description,
      books: BookId,
      userId: user._id
    };

    await booklistApi.uploadBookList(Final_Booklist);
    history.push(`/${user.nickname}/shelf`);
  };

  const handleBooklistInfo = e => {
    if (e) {
      e.preventDefault();
    }
    if (title !== "" && description !== "") {
      setNext(false);
    }
  };

  const updateTitle = e => {
    const {
      target: { value }
    } = e;
    setTitle(value);
  };

  const updateDescription = e => {
    const {
      target: { value }
    } = e;
    setDescription(value);
  };

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    if (term !== "" && description !== "") {
      showBook(term);
    }
  };

  const updateTerm = e => {
    const {
      target: { value }
    } = e;
    setTerm(value);

    setBook([]);
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
        <Box>
          <Form onSubmit={handleBooklistInfo}>
            <Template>
              <InputText
                placeholder="생성 할 북리스트 이름을 작성해주세요."
                value={title}
                onChange={updateTitle}
              />
              <CommentSection
                placeholder="생성 할 북리스트의 설명을 작성해주세요."
                value={description}
                onChange={updateDescription}
              />
              <SignButton type="submit">Next </SignButton>
            </Template>
          </Form>
        </Box>
      ) : (
        <>
          <AddBookForm
            onSubmit={handleSubmit}
            value={term}
            onChange={updateTerm}
          >
            <Search placeholder="등록된 책을 검색 해주세요." />
          </AddBookForm>
          {loading ? (
            <Loader />
          ) : (
            <>
              {bookCollection.length > 0 ? (
                <>
                  <BookNum>선택한 책 # : {clickedBook}</BookNum>
                  <Add onClick={() => pickBook(bookCollection)}>
                    책장 선정 완료
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
                      addBook={false}
                    />
                  ))}
                </Section>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;

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

const NextBtn = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
`;

const CommentSection = styled.textarea`
  margin-top: 10px;
  display: block;
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  height: 100px;
`;
export default AddBookList;
