import React from "react";
import styled from "styled-components";

import { booklistApi } from "../api";

const List = ({ booklist, clickBooklist, deleteBL }) => {
  const clickEvent = e => {
    clickBooklist(booklist._id);
  };

  const clickDelete = e => {
    deleteBL(booklist._id);
  };

  console.log(booklist);

  return (
    <Container>
      <Title onClick={clickEvent}>북리스트 : {booklist.title}</Title>
      {booklist.userBL ? (
        <DeleteBtn onClick={clickDelete}>삭제</DeleteBtn>
      ) : null}
      <BookListUl>
        {booklist.books.map((item, index) => {
          return <BookListLi key={index}>
            <BookImage src={String(item.image).replace("type=m1&", "type=m5&")} alt={item.image}></BookImage>
            <div className="desc-wrap">
              <span className="title">제목입니다~!</span>
            </div>
            </BookListLi>
        })}
      </BookListUl>
    </Container>
  );
};

const BookListUl = styled.ul`
  display:flex;
`;



const BookListLi = styled.li`

`;

const BookImage = styled.div`
  width:130px;
  height:180px;
  background: url(${props => props.src}) no-repeat center;
`;

const Container = styled.div`
  font-size: 1rem;
  width: 100%;
  overflow:hidden;

  margin-bottom: 30px;
  position: relative;
`;

const Title = styled.span``;

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;

  width: 50px;
  height: 50px;
`;
export default List;
