import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { booklistApi } from "../api";
import { Link, useHistory } from "react-router-dom";

import Table from "../Components/Table";
import List from "../Components/List";

const Shelf = () => {
  const history = useHistory();
  const [booklist, setBooklist] = useState([]);

  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const userBooklist = async nickname => {
    history.push(`/${nickname}/shelf`);
  };

  const showAllBooklist = async () => {
    try {
      const {
        data: { BooklistResult }
      } = await booklistApi.getAllBooklist();

      setBooklist(BooklistResult);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showAllBooklist();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>SHELF | WTB</title>
      </Helmet>
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
          <h1>Empty BookList</h1>
        )}
      </Table>
    </Container>
  );
};

const Container = styled.div``;

export default Shelf;
