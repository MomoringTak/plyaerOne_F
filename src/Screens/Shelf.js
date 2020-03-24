import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { booklistApi } from "../api";

export default function Shelf() {
  const [booklist, setBooklist] = useState([]);

  const getAllBooklist = async () => {
    const {
      data: { BooklistResult }
    } = await booklistApi.getAllBooklist();
    console.log(BooklistResult);
    setBooklist(BooklistResult);
  };

  useEffect(() => {
    getAllBooklist();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>SHELF | WTB</title>
      </Helmet>
      <h1>Shelf</h1>
    </Container>
  );
}

const Container = styled.div``;
