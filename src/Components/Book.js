import React, { useState } from "react";
import Poster from "./Poster";

const Book = ({
  book,
  selectBook
}) => {

  const handleSelect = event => {
    selectBook(book);
  };

  return <Poster key={book.id} book={book} selectBook={handleSelect}/>;
};

export default Book;
