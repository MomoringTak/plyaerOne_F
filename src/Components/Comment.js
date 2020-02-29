import React from "react";
import styled from "styled-components";

const Comment = ({ comment, deleteComment }) => {
  console.log(comment._id);
  const clickDelete = e => {
    deleteComment(comment._id);
  };
  return (
    <Container>
      <h5>작성 시간 : {comment.createdAt}</h5>
      <h5>작성자 이름: {comment.user[0].nickname}</h5>
      <h5>댓글 내용 : {comment.description}</h5>
      <button onClick={clickDelete}>삭제</button>
    </Container>
  );
};

const Container = styled.div`
  color: black;
`;

export default Comment;
