import React, { useState } from "react";
import styled from "styled-components";
import { bookApi, booklistApi } from "../api";

const BooklistDetail = ({
  location: { pathname },
  match: {
    params: { id }
  }
}) => {
  const [booklist, setBooklist] = useState({});

  const showBooklist = async () => {
    try {
      const {
        data: { result }
      } = await booklistApi.getOneBookList(id);
      setBooklist(result);
    } catch (e) {
      console.log(e);
    }
  };

  return <span>Shit</span>;
};

export default BooklistDetail;
