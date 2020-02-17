import React, { useState } from "react";
import Poster from "./Poster";

const Book = ({
  id,
  title,
  image,
  author,
  description,
  pubdate,
  isbn,
  isBook,
  selected,
  selectBook
}) => {
  const [book, setBook] = useState({
    key: id,
    id: id,
    title: title.replace(/(<([^>]+)>)/ig,""),
    imageUrl: image,
    author: author.replace(/(<([^>]+)>)/ig,""),
    description: description.replace(/(<([^>]+)>)/ig,""),
    pubdate: pubdate,
    isbn: isbn,
    selected: selected,
    isBook: true
  });

  const handleSelect = event => {
    selectBook(book);
    console.log(book.selected);
  };

  return <Poster key={book.id} {...book} selectBook={handleSelect}/>;
};

export default Book;
