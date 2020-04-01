import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { searchApi } from "../api";
import queryString from "query-string";
import Book from "../Components/Book";
import Section from "../Components/Section";
import Table from "../Components/Table";
import List from "../Components/List";

const Search = ({ match, location }) => {
  const [books, setBooks] = useState([]);
  const [bookList, setBookList] = useState([]);
  const query = queryString.parse(location.search);
  const keyword = query.keyword === undefined ? "" : query.keyword;

  const showResult = async () => {
    try {
      const {
        data: { success, books, booklist }
      } = await searchApi.searchBook(keyword).catch(function(err) {
        if (err.response) {
          // if (err.response.msg !== `success`) {
          //   return <Redirect to="/" />;
          // }
        }
      });
      if (success) {
        setBooks(books);
        setBookList(booklist);
      } else {
        history.push(`/404`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const history = useHistory();
  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const userBooklist = async nickname => {
    history.push(`/${nickname}/shelf`);
  };

  useEffect(() => {
    showResult();
  }, [keyword]);

  return (
    <Container>
      <h1>{keyword}의 검색 결과 입니다.</h1>

      <Section>
        {books ? (
          books.map(bookItem => (
            <Book
              key={bookItem.isbn}
              bookItem={bookItem}
              clickBook={bookDetail}
            />
          ))
        ) : (
          <h1>No Books</h1>
        )}
      </Section>

      <Table>
        {bookList ? (
          bookList.map(item => (
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
    </Container>
  );
};

const Container = styled.div``;

export default Search;
