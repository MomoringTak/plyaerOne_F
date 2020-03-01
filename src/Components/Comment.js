import React from "react";
import styled from "styled-components";
import { useGoogleAuth } from "../Components/AuthG";

const Comment = ({ comment, user, deleteComment }) => {
  const { googleUser } = useGoogleAuth();

  const clickDelete = e => {
    deleteComment(comment.uuid);
  };

  return (
    <Container>
      <h5>작성 시간 : {(new Date(comment.createdAt)).toString()}</h5>

      <h5>작성자 이름: {user.nickname}</h5>
      <h5>댓글 내용 : {comment.description}</h5>
      {googleUser.googleId === user.googleId ? (
        <button onClick={clickDelete}>삭제</button>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  color: black;
`;

export default Comment;
