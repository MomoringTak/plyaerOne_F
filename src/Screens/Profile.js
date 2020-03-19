import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import Comment from "../Components/Comment";
import Book from "../Components/Book";
import Section from "../Components/Section";

import { userApi, AuthApi } from "../api";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";

export default function Profile() {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [comment, setComment] = useState([]);
  const [wishList, setWishList] = useState([]);

  const googleAuth = useGoogleAuth();
  const { signOut } = useGoogleAuth();
  const valid = useIsValid();

  const getUser = async () => {
    try {
      const authorized = await valid(googleAuth);
      setUser(authorized);

      const {
        data: { userCommentResult }
      } = await userApi.userComment(authorized._id);

      const {
        data: { wishData }
      } = await userApi.getAllWish(authorized._id);

      console.log(wishData);
      setComment(userCommentResult);
      setWishList(wishData);
    } catch (err) {
      history.push(`/`);
    }
  };

  const deleteUser = async () => {
    try {
      await userApi.deleteUser(user._id);
      await AuthApi.clearToken(signOut);
      history.push("/");
    } catch (err) {
      history.push("/");
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>PROFILE | WTB</title>
      </Helmet>
      <Head>
        <Title>Profile</Title>
        <Spacer style={{ height: "100px" }} />
        <Wrapper>
          <span>Name</span>
          <Spacer />
          <h3>{user.nickname}</h3>
          <SLink to={`/${user.email}/editprofile`}>edit</SLink>
          <Spacer />
          <span>Email</span>
          <Spacer />
          <h3>{user.email}</h3>
          <Spacer />
          <Button onClick={deleteUser}>Delete Profile</Button>
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
            <h1>NO COMMENT</h1>
          )}

          <Dividers />
          <h1>WISHLIST</h1>
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
              <h1>No WishList</h1>
            )}
          </Section>
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

const Button = styled.button`
  color: #4a6ee0;
`;

const CommentCotainer = styled.div`
  width: 100%;
  height: 300px;

  margin-bottom: 30px;
`;

const CommentForm = styled.form`
  width: 90%;
  height: 200px;

  margin: 20px auto 0 auto;

  position: relative;
`;

const ComentTitle = styled.span`
  display: block;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 40px;

  :before {
    content: "댓글쓰기";
  }
`;

const CommentSection = styled.textarea`
  display: block;
  width: 90%;
  height: 100px;
  margin: 10px auto 0 auto;
`;

const CommentSubmit = styled.button`
  width: 50px;
  height: 20px;

  right: 5%;
  bottom: 10%;
  position: absolute;

  text-align: center;
`;

const CommentList = styled.ul`
  list-style: none;
`;

const CommentTitle = styled.span`
  font-size: 1rem;
  font-weight: 700;

  margin-left: 5%;
`;

const Dividers = styled.div`
  width: 100%;
  border: 0.8px solid black;
  margin-bottom: 5px;
  margin-top: 5px;
`;
