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
  isBook
}) => {
  const [book, setBook] = useState({
    key: id,
    id: id,
    title: title,
    imageUrl: image,
    author: author,
    description: description,
    pubdate: pubdate,
    isbn: isbn,
    isBook: true
  });

  return <Poster key={book.id} {...book} />;
};

export default Book;
