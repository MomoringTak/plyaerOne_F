import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { booklistApi } from "../api";

const List = ({
  booklist,
  clickBooklist,
  deleteBL,
  user,
  userInfo,
  clickUser
}) => {
  const [score, setScore] = useState({});
  const history = useHistory();
  const clickEvent = e => {
    clickBooklist(booklist._id);
  };

  const navigateUser = e => {
    clickUser(userInfo.nickname);
  };

  const progress = async () => {
    const logger = booklist.books.map(book => {
      const singleLogger = {
        book: book._id,
        user: user
      };
      return singleLogger;
    });

    const {
      data: { success, Scores }
    } = await booklistApi.getAllReadLog(logger);
    if (success) {
      Scores.progress = Scores.doneReading / booklist.books.length;

      setScore(Scores);
    } else {
      history.push(`/404`);
    }
  };

  const clickDelete = e => {
    deleteBL(booklist._id);
  };

  const empty = [];

  // for (const [index, value] of elements.entries()) {
  //   items.push(<li key={index}>{value}</li>)
  // }

  if (booklist.books.length < 4) {
    for (var i = booklist.books.length; i < 4; i++) {
      empty.push(<BookListEmptyLi key={i}></BookListEmptyLi>);
    }
  }

  useEffect(() => {
    if (user !== undefined) progress();
  }, []);
  return (
    <Container>
      <div>
        <div className="shelf-title" onClick={clickEvent}><span className="main-title">{booklist.title}</span><span className="sub-title">({booklist.description})</span> </div>
        {userInfo && (
          <span> 주인장 : {userInfo.nickname} </span>
        )}
        <DetailView onClick={clickEvent}>상세보기 ></DetailView>
      </div>
      <Divider color={"#EFEFEF"} size={`2`}></Divider>
      <BookListUl>
        {booklist.books.map((item, index) => (
          <BookListLi key={index}>
            <BookImage
              src={String(item.image).replace("type=m1&", "type=m5&")}
              alt={item.image}
            ></BookImage>
            <BookListDesc>
              <p className="booktitle">{item.title}</p>
              <p className="desc">
                {item.author} 저 &nbsp; | &nbsp; {item.publisher}
              </p>
            </BookListDesc>
          </BookListLi>
        ))}
        {empty}
      </BookListUl>
      <Divider color={"#EFEFEF"} size={`0.5`}></Divider>
      {user && (
        <div className="bottom-desc">
          <span className="bold">{score.doneReading}</span>&nbsp;권 읽음 / 총&nbsp;<span className="bold">{booklist.books.length}</span>&nbsp;권  ({parseInt(score.progress * 1000)/10.0}%)
        </div>
      )}
      {booklist.userBL
        ? user && <DeleteBtn onClick={clickDelete}>책장 삭제하기</DeleteBtn>
        : null}
    </Container>
  );
};

const Container = styled.div`
  font-size: 1rem;
  width: 100%;
  margin-bottom: 30px;
  position: relative;

  .shelf-title{
    margin-left: 5px;
    color: #555;
    letter-spacing: -0.2;
    cursor: pointer;
    display:inline-flex;
    line-height:20px;
    .main-title{
      font-size: 18px;
      font-weight: 600;
      margin-right:5px;
    }
    .sub-title{
      font-size: 16px;
      font-weight: 400;
    }
  }

  .bottom-desc {
    margin-left: 5px;
    color: #555;
    letter-spacing: -0.2;
    cursor: pointer;
    display:inline-flex;
    line-height:16px;
    font-size:13px;
    font-weight:400;
    .bold{
      font-weight: 600;
    }
  }
`;


const DetailView = styled.span`
  float: right;
  font-size: 12px;
  margin-top: 3px;
  margin-right: 5px;
  font-weight: 600;
  color: #777;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
const DeleteBtn = styled.button`
  position: absolute;
  right: 0px;
  bottom: 3px;
  color:#999;
  font-size: 12px;
  font-weight:300;
  &:hover{
    color:#555;
  }
`;

const Divider = styled.div`
  height: ${props => props.size}px;
  width: 100%;
  background: ${props => props.color};
  margin: 5px 0 5px;
`;

const BookListUl = styled.ul`
  display: flex;
  width: 100%;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    overflow-x: auto;
  }

  @media only screen and (min-width: 768px) {
  }
`;

const BookListLi = styled.li`
  display: block;
  box-sizing: border-box;
  margin-right: 15px;
  width: 188px;
  position: relative;
  padding-top: 245px;
`;

const BookListEmptyLi = styled.li`
  display: block;
  box-sizing: border-box;
  margin-right: 15px;
  width: 188px;
  position: relative;
  height: 329px;
  &:after {
    content: "+";
    position: absolute;
    font-size: 100px;
    line-height: 301px;
    text-align: center;
    left: 10px;
    top: 10px;
    width: 160px;
    height: 301px;
    color: #ccc;
    border-radius: 20px;
    border: 4px dotted #ccc;
  }
  &:before {
    content: "";
    width: 188px;
    display: block;
  }
`;

const BookImage = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  width: 168px;
  height: 240px;
  background: url(${props => props.src}) no-repeat top;
  background-size: cover;
`;

const BookListDesc = styled.div`
  width: 188px;
  padding: 10px 15px;

  > .booktitle {
    display: -webkit-box;
    min-height: 17px;
    max-height: 34px;
    line-height: 17px;
    word-break: break-all;
    overflow: hidden;
    font-size: 13px;
    color: #333;
    font-weight: 600;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  > .desc {
    margin-top: 10px;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 15px;
    min-height: 15px;
    max-height: 15px;
    font-size: 11px;
    color: #777;
    font-weight: 500;
  }
`;

export default List;
