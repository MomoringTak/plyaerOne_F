import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

import { bookApi } from "../api";
import { booklistApi } from "../api";
import Book from "../Components/Book";
import Section from "../Components/Section";
import Table from "../Components/Table";
import List from "../Components/List";

export default function Home() {
  const [book, setBook] = useState([]);
  const [booklist, setBooklist] = useState([]);
  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const userBooklist = async nickname => {
    history.push(`/${nickname}/shelf`);
  };

  //Redirecting via history neither Link or Redirect
  const history = useHistory();

  const showBook = async () => {
    try {
      const {
        data: { success, books }
      } = await bookApi.getAllBook();
      if (success) setBook(books);
      else {
        history.push(`/404`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  const showAllBooklist = async () => {
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
  const dummyFuntion = () => {};
  useEffect(() => {
    showAllBooklist();
    showBook();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>HOME | WTB</title>
      </Helmet>
      <Section title="새로 등록된 책">
        {book ? (
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
      </Section>
      <Section title="다른 유저들은 어떤책을 읽을까?">
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
      </Section>
    </Container>
  );
}

const Container = styled.div``;
