import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { useGoogleAuth } from "../Components/AuthG";
import { bookApi, userApi, commentApi } from "../api";

import reducer, { initialState, ADD, DEL } from "../Components/Reducer/reducer";

import Comment from "../Components/Comment";

export default function BookDetail({
  location: { pathname },
  match: {
    params: { id }
  }
}) {
  const { googleUser } = useGoogleAuth();
  const [user, setUser] = useState([]);
  const [book, setBook] = useState({});
  const [comment, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState("");
  const [allComment, setAllComment] = useState([]);

  const saveComment = async () => {
    const {
      data: { user }
    } = await userApi.getUser(googleUser.googleId);
    setUser(user);
    const COMMENT_DATA = {
      user: user._id,
      book: book._id,
      description: commentText
    };

    await commentApi.commentBook(COMMENT_DATA);
  };

  const onSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    saveComment();

    dispatch({ type: ADD, payload: commentText });
    setCommentText("");
  };

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setCommentText(value);
  };

  const showBook = async () => {
    const {
      data: { book: Results }
    } = await bookApi.getBookDetail(id);
    const {
      data: { commentResult }
    } = await commentApi.bookComment(Results._id);
    setBook(Results);
    setAllComment(commentResult);
  };

  const deleteComments = async commentId => {
    try {
      console.log("fk");
      await commentApi.deleteComment(commentId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    showBook();
  }, []);

  return (
    <Container>
      <LeftContainer>
        <img
          className="bookImage"
          src={String(book.image).replace("type=m1&", "")}
          alt={book.title}
        ></img>
      </LeftContainer>
      <RightContainer>
        <Item>
          <h1>{book.title}</h1>by {book.author}
        </Item>
        <Divider></Divider>
        <Item className="description">{book.description}</Item>
        <Item className="author-wrap">
          <img
            src="https://secure.gravatar.com/avatar/f56af396b817f5a028808653642862de?s=50&amp;d=mm&amp;r=g"
            alt={book.author}
          ></img>
          <span>{book.author}</span>
        </Item>
        <Item>{book.publisher}</Item>
      </RightContainer>
      <ContentContainer>
        <CommentCotainer>
          <CommentForm onSubmit={onSubmit}>
            <ComentTitle />
            <CommentSection
              placeholder="댓글 입력"
              value={commentText}
              onChange={onChange}
            />
            <CommentSubmit type="submit">등록</CommentSubmit>
          </CommentForm>
          <Dividers />
          <CommentTitle>댓글</CommentTitle>
          <Dividers />
          <CommentList>
            <h4>추가된 댓글들 </h4>
            {allComment.map(comment => (
              <Comment
                key={comment._id}
                comment={comment}
                deleteComment={deleteComments}
              />
            ))}
            {comment.comments.map(item => (
              <li key={item.id}>
                <h5>작성 시간 : {item.time}</h5>
                <h5>작성자 이름 : {user.nickname}</h5>
                <span>댓글 내용 : {item.text}</span>
              </li>
            ))}
          </CommentList>
        </CommentCotainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div``;

const LeftContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    width: 250px;
    float: left;
  }

  > img.bookImage {
    width: 100%;
  }
`;

const RightContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    padding: 0 30px;
    width: calc(100% - 250px);
    float: left;
  }
`;

const Item = styled.div`
  margin-bottom: 10px;
  color: #333;

  &.description {
    color: #555;
    font-weight: 300;
    line-height: 20px;
    padding-right: 30px;
    margin-bottom: 30px;
  }

  &.author-wrap {
    display: flex;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-right: 15px;
    }
    > span {
      width: calc(100% - 55px);
      line-height: 40px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #ccc;
  margin: 15px 0;
`;

const ContentContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  float: left;
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
