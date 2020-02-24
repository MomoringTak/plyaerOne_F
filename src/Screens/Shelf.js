import React, { useEffect } from "react";
import styled from "styled-components";

import { booklistApi } from "../api";
import { useGoogleAuth } from "../Components/AuthG";

export default function Shelf() {
  const { googleUser } = useGoogleAuth();

  const showBookList = async () => {
    try {
      const data = await booklistApi.getBookList(googleUser.googleId);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    showBookList();
  }, []);

  return (
    <Container>
      <h1>Shelf</h1>
    </Container>
  );
}

const Container = styled.div`
`;
