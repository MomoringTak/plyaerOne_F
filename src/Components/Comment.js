import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../Components/AuthG";

const Comment = ({ comment, user, deleteComment, book, profile }) => {
  const { googleUser } = useGoogleAuth();

  const clickDelete = e => {
    deleteComment(comment.uuid);
  };

  const convertDate = date => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return year + "." + month + "." + day;
  };
  return (
    <Container>
      <div>
        {profile && (
          <Link to={`/book/${book.isbn}`}>
            {book.title.substring(0, 30)}...
          </Link>
        )}
        <div className="content">{comment.description}</div>
        <div className="writer">
          <span>{user.nickname}</span>
          <span>{convertDate(new Date(comment.createdAt))}</span>
          {googleUser.googleId === user.googleId ? (
            <span className="remove" onClick={clickDelete}>
              삭제
            </span>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.li`
  all: unset;
  color: black;
  margin-top: 10px;

  &:first-child {
    border-top: 0 none;
  }
  padding: 10px 10px 8px;
  border-top: 1px solid #dddfe1;
  background-color: #fff;

  > div {
    .content {
      overflow: hidden;
      width: 100%;
      font-size: 14px;
      color: #333;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .writer {
      position: relative;
      height: 26px;
      padding-top: 8px;
      font-size: 12px;
      color: #666;
      line-height: 18px;
      > span {
        padding-right: 9px;
        &.remove {
          float: right;
          cursor: pointer;
        }
      }
    }
  }
`;

export default Comment;
