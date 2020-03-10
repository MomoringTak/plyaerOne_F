import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, booklistApi, commentApi } from "../api";

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
  const [booklist, setBooklist] = useState([]);

  const [click, setClick] = useState(false);

  const googleAuth = useGoogleAuth();
  const valid = useIsValid();

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
  };

  const saveComment = async () => {
    getUser();

    const COMMENT_DATA = {
      user: user._id,
      book: book._id,
      description: commentText,
      uuid: uuidv4()
    };

    const {
      data: { commentResult, success, msg }
    } = await commentApi.commentBook(COMMENT_DATA);

    if (success) {
      dispatch({
        type: ADD,
        payload: {
          commentText: commentResult.description,
          id: commentResult.uuid,
          createdAt: commentResult.createdAt
        }
      });
    } else {
      alert(msg);
    }
  };

  const onSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    saveComment();

    setCommentText("");
  };

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setCommentText(value);
  };

  const showBook = async () => {
    if (null !== googleUser && user.length === 0) {
      //get all info about the book.
      try {
        const {
          data: { book: Results }
        } = await bookApi.getBookDetail(id);

        setBook(Results);

        //get all the booklist of users
        const {
          data: {
            booklist: { booklists }
          }
        } = await booklistApi.getBookList(googleUser.googleId);
        if (booklists !== null) setBooklist(booklists);

        //get all the comment.
        const {
          data: { commentResult }
        } = await commentApi.bookComment(Results._id);

        setAllComment(commentResult);
      } catch (err) {
        alert(err);
      }
    }
  };

  const deleteComments = async commentId => {
    try {
      const {
        data: { commentResult }
      } = await commentApi.deleteComment(commentId, book._id);
      setAllComment(commentResult);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNow = async commentId => {
    const {
      data: { commentResult }
    } = await commentApi.deleteComment(commentId, book._id);
    dispatch({ type: DEL, payload: commentId });
  };

  const clickAddBook = () => {
    setClick(!click);
  };

  useEffect(() => {
    showBook();
  }, [googleUser]);

  return (
    <>
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
          <Item>좋아요</Item>
          {booklist.length > 0 ? (
            <AddBookBtn onClick={clickAddBook}>책 묶음에 추가</AddBookBtn>
          ) : null}
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
                  user={comment.user}
                  deleteComment={deleteComments}
                />
              ))}
              {comment.comments.map(comment => (
                <Comment
                  key={comment.uuid}
                  comment={comment}
                  user={user}
                  deleteComment={deleteNow}
                />
              ))}
            </CommentList>
          </CommentCotainer>
        </ContentContainer>
      </Container>
      <AddBook clicked={click}>
        <AddBookTemplate>
          <CloseBtn onClick={clickAddBook}>❌</CloseBtn>
          <div>
            {booklist ? (
              booklist.map(item => (
                <h1
                  onClick={async () => {
                    await bookApi.addToBooklist(book._id, item._id);
                    setClick(false);
                  }}
                  key={item._id}
                >
                  {item.title}
                </h1>
              ))
            ) : (
              <span>책묶음이 없습니다.</span>
            )}
          </div>
        </AddBookTemplate>
      </AddBook>
    </>
  );
}

const AddBookBtn = styled.button`
  border: 1px solid black;
  width: 100px;
  height: 50px;
  padding: 5px;
`;

const CloseBtn = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;

const AddBookTemplate = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const AddBook = styled.div`
  position: absolute;
  display: ${props => (props.clicked ? "block" : "none")};
  width: 360px;
  height: 360px;
  border: 1px solid black;
  margin-left: calc(50% - 180px);
  margin-top: calc(50% - 180px);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

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
    &:after {
      content: "";
      clear: both;
    }
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
