import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, AuthApi } from "../api";
import Book from "../Components/Book";
import Section from "../Components/Section";

export default function Home() {
  const [book, setBook] = useState([]);

  const isTokenExist = AuthApi.getToken();

  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  //Redirecting via history neither Link or Redirect
  const history = useHistory();

  const getCustomized = async authorized => {
    try {
      const {
        data: { ageTopLikeBook, ageTopReadBook }
      } = await bookApi.getAgeRecommendation(authorized._id);
    } catch (err) {
      console.log(err);
    }
  };

  const showBook = async authorized => {
    try {
      const {
        data: { books }
      } = await bookApi.getAllBook();
      setBook(books);

      const {
        data: { wishTop, readTop, commentTop }
      } = await bookApi.getCuration();

      if (isTokenExist !== null) {
        getCustomized(authorized);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };
  const dummyFuntion = () => {};

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    showBook(authorized);
  };

  useEffect(() => {
    getUser();
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
              recordBook={dummyFuntion}
            />
          ))
        ) : (
          <h1>표시 할 책이 없습니다.</h1>
        )}
      </Section>
    </Container>
  );
}

const Container = styled.div``;
