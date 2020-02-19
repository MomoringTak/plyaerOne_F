import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { bookApi } from "../api";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Book from "../Components/Book";

const AddBookList = () => {
  const [booklist, setBooklist] = useState({});
  const [next, setNext] = useState(true);
  const [title, setTitle] = useState("");

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

  const pickBook = () => {
    const newbook = book.filter(item => item.selected === true);
    console.log(newbook);
  };

  const selectedBook = bookItem => {
    setClickedBook(prev => prev + (bookItem.selected ? 1 : -1));
    book.filter(x => x.isbn === bookItem.isbn)[0].selected = !bookItem.selected;
    setBook(book);
  };

  const handleTitle = e => {
    if (e) {
      e.preventDefault();
    }
    if (title !== "") {
      setNext(false);
      setBooklist({ ...booklist, title: title, items: [] });
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
    setTerm(value);

    setBook([]);
    setClickedBook(0);
  };

  return (
    <Container>
      <Card>
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
              onChange={updateTitle}
            >
              <Search placeholder="추가할 책을 검색 해주세요." />
            </AddBookForm>
            {loading ? (
              <Loader />
            ) : (
              <>
                {clickedBook > 0 ? (
                  <>
                    <BookNum>
                      북 리스트에 추가 할 책 갯수 : {clickedBook}
                    </BookNum>
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
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-left: 200px;
  height: 100vh;
`;

const Card = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
`;

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
  border: 1px solid blue;
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
