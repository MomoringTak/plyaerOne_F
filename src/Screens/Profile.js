import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import Comment from "../Components/Comment";
import Book from "../Components/Book";
import Section from "../Components/Section";
import { v4 as uuidv4 } from "uuid";

import { userApi } from "../api";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";

export default function Profile() {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [comment, setComment] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [readList, setReadList] = useState([]);

  const googleAuth = useGoogleAuth();
  const { signOut } = useGoogleAuth();
  const valid = useIsValid();

  //Attempt to assing a new uuid value as a unique key to each of the book in the list
  /* 
  const assignUniqueKey = booklist => {
    return booklist.map(item => (item.key = uuidv4()));
  };
  */

  const getUser = async () => {
    try {
      const authorized = await valid(googleAuth);
      setUser(authorized);

      const {
        data: { userCommentResult, wishData, readData }
      } = await userApi.getUserMyPage(authorized._id);

      setComment(userCommentResult);
      setWishList(wishData);
      setReadList(readData);
    } catch (err) {
      history.push(`/`);
    }
  };

  //Delete Profile
  /* 
  const deleteUser = async () => {
    try {
      await userApi.deleteUser(user._id);
      await AuthApi.clearToken(signOut);
      history.push("/");
    } catch (err) {
      history.push("/");
    }
  };
  */

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>My Page | WTB</title>
      </Helmet>
      <Head>
        <Title>마이 페이지</Title>
        <Spacer style={{ height: "100px" }} />
        <Wrapper>
          <span>이름</span>
          <Spacer />
          <h3>{user.nickname}</h3>
          <SLink to={`/${user.email}/editprofile`}>edit</SLink>
          <Spacer />
          <span>이메일</span>
          <Spacer />
          <h3>{user.email}</h3>
          <Spacer />
          {/* <Button onClick={deleteUser}>Delete Profile</Button> */}
          <Spacer />
          <Dividers />
          {comment.length >= 1 ? (
            comment.map(comment => (
              <Comment
                key={comment._id}
                comment={comment}
                user={comment.user}
                book={comment.book}
              />
            ))
          ) : (
            <h1>작성 된 댓글이 없습니다.</h1>
          )}

          <Dividers />
          <h1>좋아요 한 책</h1>
          <Section>
            {wishList ? (
              wishList.map(item => (
                <Book
                  key={item.book.isbn}
                  bookItem={item.book}
                  clickBook={bookDetail}
                />
              ))
            ) : (
              <h1>해당 되는 책이 없습니다.</h1>
            )}
          </Section>
          <Dividers />
          <h1>읽은 책</h1>
          <Section>
            {readList ? (
              readList.map(item => (
                <Book
                  key={item.book.isbn}
                  bookItem={item.book}
                  clickBook={bookDetail}
                />
              ))
            ) : (
              <h1>해당 되는 책이 없습니다.</h1>
            )}
          </Section>

          <Dividers />
        </Wrapper>
      </Head>
    </Container>
  );
}

const Container = styled.div``;

const Head = styled.div`
  margin: 20px 20px;
`;

const Title = styled.span`
  display: block;
  font-weight: 600;
  font-size: 2rem;
`;

const Spacer = styled.div`
  height: 15px;
`;

const Wrapper = styled.div`
  font-weight: 500;
  color: #8189a9;
`;

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;

const Dividers = styled.div`
  width: 100%;
  border: 0.8px solid black;
  margin-bottom: 5px;
  margin-top: 5px;
`;
