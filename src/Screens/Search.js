import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { searchApi } from "../api";
import queryString from "query-string";
import Book from "../Components/Book";
import Section from "../Components/Section";
import Table from "../Components/Table";
import List from "../Components/List";
// import Section from "../Components/Section";

const Container = styled.div`
`;
export default function Search({match, location}) {
  const [books, setBooks] = useState([]);
  const [bookList, setBookList] = useState([]);
  const query = queryString.parse(location.search);
  const keyword = query.keyword === undefined ? "" : query.keyword;

  const showResult = async () => {
    try {
      const {
        data: { books, booklist }
      } = await searchApi.searchBook(keyword).catch(function(err) {
        if (err.response) {
          // if (err.response.msg !== `success`) {
          //   return <Redirect to="/" />;
          // }
        }
      });
      setBooks(books);
      setBookList(booklist);
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
                deleteBL={()=>{}}
                user={-1}
              />
            ))
          ) : (
            <h1>Empty BookList</h1>
          )}
        </Table>
    </Container>
  );
}
