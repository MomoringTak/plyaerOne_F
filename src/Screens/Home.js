import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, AuthApi } from "../api";
import { booklistApi } from "../api";
import Book from "../Components/Book";
import Section from "../Components/Section";
import Table from "../Components/Table";
import List from "../Components/List";

import { MobileList } from "../Components/Style/Common";

export default function Home() {
  const [book, setBook] = useState([]);
  const [booklist, setBooklist] = useState([]);

  const [wishBook, setWishBook] = useState([]);
  const [readBook, setReadBook] = useState([]);
  const [commentBook, setCommentBook] = useState([]);

  const [ageLikeBook, setAgeLikeBook] = useState([]);
  const [ageReadBook, setAgeReadBook] = useState([]);

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
      setAgeLikeBook(ageTopLikeBook);
      setAgeReadBook(ageTopReadBook);
    } catch (err) {
      console.log(err);
    }
  };

  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const userBooklist = async nickname => {
    history.push(`/${nickname}/shelf`);
  };

  const showBook = async authorized => {
    try {
      const {
        data: { success, books }
      } = await bookApi.getAllBook();

      const {
        data: { wishTop, readTop, commentTop }
      } = await bookApi.getCuration();

      if (isTokenExist !== null) {
        getCustomized(authorized);
      }

      if (success) {
        setBook(books);
        setWishBook(wishTop);
        setReadBook(readTop);
        setCommentBook(commentTop);
      } else {
        history.push(`/404`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dummyFuntion = () => {};

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  const showAllBooklist = async authorized => {
    try {
      const {
        data: { success, BooklistResult }
      } = await booklistApi.getAllBooklist();
      if (success) setBooklist(BooklistResult);
      else {
        history.push(`/404`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AgeRecommendation =
    isTokenExist !== null ? (
      <div>
        <Section title="또래가 가장 사랑하는 책">
          <MobileList>
            {ageLikeBook.length >= 1 ? (
              ageLikeBook.map((bookItem, index) => {
                return (
                  index < 8 && (
                    <Book
                      key={bookItem.isbn}
                      bookItem={bookItem}
                      clickBook={bookDetail}
                      recordBook={dummyFuntion}
                    />
                  )
                );
              })
            ) : (
              <h1>표시 할 책이 없습니다.</h1>
            )}
          </MobileList>
        </Section>
        <Section title="또래가 가장 많이 읽은 책">
          <MobileList>
            {ageReadBook.length >= 1 ? (
              ageReadBook.map((bookItem, index) => {
                return (
                  index < 8 && (
                    <Book
                      key={bookItem.isbn}
                      bookItem={bookItem}
                      clickBook={bookDetail}
                      recordBook={dummyFuntion}
                    />
                  )
                );
              })
            ) : (
              <h1>표시 할 책이 없습니다.</h1>
            )}
          </MobileList>
        </Section>
      </div>
    ) : null;

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    showBook(authorized);
    showAllBooklist(authorized);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>HOME | WTB</title>
      </Helmet>
      <Section title="최근 등록된 책">
        <MobileList>
          {book.length >= 1 ? (
            book.map((bookItem, index) => {
              return (
                index < 8 && (
                  <Book
                    key={bookItem.isbn}
                    bookItem={bookItem}
                    clickBook={bookDetail}
                    recordBook={dummyFuntion}
                  />
                )
              );
            })
          ) : (
            <h1>표시 할 책이 없습니다.</h1>
          )}
        </MobileList>
      </Section>
      {AgeRecommendation}
      <Section title="최근 가장 사랑받는 책">
        <MobileList>
          {wishBook.length >= 1 ? (
            wishBook.map((bookItem, index) => {
              return (
                index < 8 && (
                  <Book
                    key={bookItem.isbn}
                    bookItem={bookItem}
                    clickBook={bookDetail}
                    recordBook={dummyFuntion}
                  />
                )
              );
            })
          ) : (
            <h1>표시 할 책이 없습니다.</h1>
          )}
        </MobileList>
      </Section>
      <Section title="최근 가장 많이 읽힌 책">
        <MobileList>
          {readBook.length >= 1 ? (
            readBook.map((bookItem, index) => {
              return (
                index < 8 && (
                  <Book
                    key={bookItem.isbn}
                    bookItem={bookItem}
                    clickBook={bookDetail}
                    recordBook={dummyFuntion}
                  />
                )
              );
            })
          ) : (
            <h1>표시 할 책이 없습니다.</h1>
          )}
        </MobileList>
      </Section>
      <Section title="최근 가장 의견이 많이 달린 책">
        <MobileList>
          {commentBook.length >= 1 ? (
            commentBook.map((bookItem, index) => {
              return (
                index < 8 && (
                  <Book
                    key={bookItem.isbn}
                    bookItem={bookItem}
                    clickBook={bookDetail}
                    recordBook={dummyFuntion}
                  />
                )
              );
            })
          ) : (
            <h1>표시 할 책이 없습니다.</h1>
          )}
        </MobileList>
      </Section>
      {/* <Section title="다른 유저들은 어떤책을 읽을까?">
        <Table>
          {booklist ? (
            booklist.map(item => (
              <List
                key={item._id}
                booklist={item}
                clickBooklist={booklistDetail}
                userInfo={item.userId}
                clickUser={userBooklist}
              />
            ))
          ) : (
            <h1>책장이 비어져있습니다.</h1>
          )}
        </Table>
      </Section> */}
    </Container>
  );
}

const Container = styled.div``;
