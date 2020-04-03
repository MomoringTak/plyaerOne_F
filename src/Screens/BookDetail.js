import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, booklistApi, commentApi, AuthApi, userApi } from "../api";

import reducer, { initialState, ADD, DEL } from "../Components/Reducer/reducer";
import Comment from "../Components/Comment";

import useWindowSize from "../Components/WindowSize";

import { Divider } from "../Components/Style/Common";

import Icon from "@mdi/react";
import {
  mdiBookPlusMultiple, // 책장에 추가
  mdiRead, // 읽음
  mdiAlphaRCircle,
  mdiHeart, // 좋아요
  mdiHeartOutline
} from "@mdi/js";

export default function BookDetail({
  location: { pathname },
  match: {
    params: { id }
  }
}) {
  const [user, setUser] = useState([]);
  const [book, setBook] = useState({});
  const [comment, dispatch] = useReducer(reducer, initialState);
  const [commentText, setCommentText] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [booklist, setBooklist] = useState([]);

  const [click, setClick] = useState(false);
  const [readClick, setReadClick] = useState(false);
  const [wish, setWish] = useState(false);
  const [doneReading, setDoneReading] = useState(false);
  const [readLogger, setReadLogger] = useState({});

  const [placeholder, setPlaceholder] = useState("댓글을 입력해주세요");

  const [time, setTime] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [wishNum, setWishNum] = useState(0);
  const [readNum, setReadNum] = useState(0);

  const [averageTime, setAverageTime] = useState("읽지 않음");
  const [averageDifficulty, setAverageDifficulty] = useState("읽지 않음");

  const [maxNumTime, setMaxNumTime] = useState(0);
  const [maxNumDifficulty, setMaxNumDifficulty] = useState(0);
  const [arrTime, setArrTime] = useState([0, 0, 0]);
  const [arrDifficulty, setArrDifficulty] = useState([0, 0, 0]);
  const [statisticLocation, setStatisticLocation] = useState(0);

  const history = useHistory();
  const [step, setStep] = useState(0);

  const isTokenExist = AuthApi.getToken();

  const googleAuth = useGoogleAuth();
  const valid = useIsValid();
  const size = useWindowSize();

  const saveComment = async () => {
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
    if (isTokenExist === null) {
      alert("댓글을 등록하시려면 로그인 해주세요");
    } else if (commentText === "") {
      alert("댓글 내용이 비어져 있습니다.");
    } else if (isTokenExist !== null) {
      saveComment();
    }
    setCommentText("");
  };

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setCommentText(value);
  };

  const getUserBooklist = async user => {
    const {
      data: {
        success,
        booklist: { booklists }
      }
    } = await booklistApi.getBookList(user.email);
    if (success) setBooklist(booklists);
    else {
      history.push(`/404`);
    }
  };

  const getReadLogger = async (userId, bookId) => {
    const logData = {
      user: userId,
      book: bookId
    };

    const {
      data: { success, logResult }
    } = await userApi.getReadLogger(logData);
    if (success) {
      if (logResult !== null) {
        setWish(logResult.wish);
        setDoneReading(logResult.doneReading);
      }
      setReadLogger(logResult);
    } else {
      history.push(`/404`);
    }
  };

  const showBook = async user => {
    //get all info about the book.
    try {
      const {
        data: { success, book: Results }
      } = await bookApi.getBookDetail(id);
      if (success) {
        setBook(Results);
      } else {
        history.push(`/404`);
      }

      /* 
        wishNumber : 해당 책이 가지고있는 좋아요 갯수
        readNumber : 해당 책이 읽힌 횟수 
        maxTime : 가장 많이 선택된 읽음 소요 시간
        maxDifficulty : 가장 많이 선택된 난이도 
        averageTime : 시간 소요 전체 분포도 as Object Type
      averageDiffculty : 난이도 전체 분포도 as Object Type
      */

      //success 명을 다르게 받아야됨. 아하 그래서 success도 명칭이 백에서 다다르게 명칭해야되는구나.
      const {
        data: {
          wishNumber,
          readNumber,
          maxTime,
          maxDifficulty,
          averageTime,
          averageDifficulty
        }
      } = await bookApi.getBookWish(Results._id);

      setWishNum(wishNumber);
      setReadNum(readNumber);
      setAverageTime(maxTime);
      setAverageDifficulty(maxDifficulty);

      let arrTmpTime = [];
      let maxTmpTime = 0;
      for (const item in averageTime) {
        arrTmpTime.push(averageTime[item]);
        if (averageTime[item] > maxTmpTime) maxTmpTime = averageTime[item];
      }
      setArrTime(arrTmpTime);
      setMaxNumTime(maxTmpTime);

      let arrTmpDiff = [];
      let maxTmpDiff = 0;
      for (const item in averageDifficulty) {
        arrTmpDiff.push(averageDifficulty[item]);
        if (averageDifficulty[item] > maxTmpDiff)
          maxTmpDiff = averageDifficulty[item];
      }
      setArrDifficulty(arrTmpDiff);
      setMaxNumDifficulty(maxTmpDiff);
      setTimeout(statisticLocationChange, 5000);

      if (isTokenExist != null) {
        getUserBooklist(user);
        getReadLogger(user._id, Results._id);
      }

      //get all the comment.
      const {
        data: { commentResult }
      } = await commentApi.bookComment(Results._id);
      setAllComment(commentResult);
    } catch (err) {
      alert(err);
    }
  };

  const statisticLocationChange = () => {
    if (statisticLocation === 0) setStatisticLocation(1);
    else setStatisticLocation(0);
  };

  const deleteComments = async commentId => {
    try {
      const {
        data: { success, commentResult }
      } = await commentApi.deleteComment(commentId, book._id);
      if (success) setAllComment(commentResult);
      else {
        history.push(`/404`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNow = async commentId => {
    const {
      data: { success, commentResult }
    } = await commentApi.deleteComment(commentId, book._id);
    if (success) dispatch({ type: DEL, payload: commentId });
    else {
      history.push(`/404`);
    }
  };

  const clickAddBook = () => {
    setClick(!click);
  };

  const clickReadBook = () => {
    setReadClick(!readClick);
  };

  const clickWishlist = async (wish, doneReading) => {
    if (wish) {
      setWishNum(prev => prev - 1);
    } else if (wish === false) {
      setWishNum(prev => prev + 1);
    }
    const logData = {
      user: user._id,
      book: book._id,
      wish: !wish
    };

    //Need Error Handling in the future.
    if (!doneReading) {
      const {
        data: { success }
      } = await userApi.handleWish(logData);
      if (success) setWish(!wish);
      else {
        history.push(`/404`);
      }
    }
  };

  //하아 시바 인풋 핸들링. 꼭 따로 펑셔널하게 만든다. 시부엉 넘나 Redudunt, duplicate && Inefficient
  const handleTime = e => {
    const {
      target: { value }
    } = e;
    let valueS = parseInt(value);
    setStep(3);
    setTime(valueS);
  };

  const handledifficulty = e => {
    const {
      target: { value }
    } = e;
    console.log(e);
    console.log(value);
    setStep(2);
    setDifficulty(value);
  };

  const clickDoneReading = async () => {
    setReadClick(false);
    if (doneReading === false) {
      setReadNum(prev => prev + 1);
    }
    const logData = {
      user: user._id,
      book: book._id,
      difficulty: difficulty,
      time: time,
      doneReading: !doneReading
    };

    const {
      data: { success }
    } = await userApi.handleRead(logData);
    if (success) setDoneReading(!doneReading);
    else {
      history.push(`/404`);
    }
  };

  const cancelReading = async () => {
    const logData = {
      user: user._id,
      book: book._id,
      doneReading: !doneReading
    };

    const {
      data: { success }
    } = await userApi.handleRead(logData);
    if (success) setDoneReading(!doneReading);
    else {
      history.push(`/404`);
    }
  };

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
    showBook(authorized);
  };

  const actionButtons =
    isTokenExist !== null ? (
      <ButtonTemplate>
        <AddBookBtn
          doneReading={doneReading}
          onClick={() => {
            if (doneReading) {
              cancelReading();
              setReadNum(prev => prev - 1);
            } else {
              clickReadBook();
            }
          }}
        >
          <Icon
            path={doneReading ? mdiAlphaRCircle : mdiRead}
            size={size.width >= 768 ? `14px` : `16px`}
            color={`#666`}
          ></Icon>
          <span>{readNum}</span>
        </AddBookBtn>
        {step > 0 && (
          <Box
            top="45px"
            left={size.width >= 768 ? "-35px" : "calc(50% - 150px)"}
            width=""
            textAlign="left"
          >
            {step === 1 && (
              <>
                <legend>Q. 이 책의 난이도는?</legend>
                <ul className="difficulty">
                  <li>
                    <input
                      id="difficulty_1"
                      type="radio"
                      value="1"
                      name="difficulty"
                      onChange={handledifficulty}
                    />
                    <label htmlFor={"difficulty_1"}>초급</label>
                  </li>
                  <li>
                    <input
                      id="difficulty_2"
                      type="radio"
                      value="2"
                      name="difficulty"
                      onChange={handledifficulty}
                    />
                    <label htmlFor={"difficulty_2"}>중급</label>
                  </li>
                  <li>
                    <input
                      id="difficulty_3"
                      type="radio"
                      value="3"
                      name="difficulty"
                      onChange={handledifficulty}
                    />
                    <label htmlFor={"difficulty_3"}>고급</label>
                  </li>
                </ul>
              </>
            )}
            {step === 2 && (
              <>
                <legend>Q. 이 책을 읽는데 소요된 시간은?</legend>
                <ul className="difficulty">
                  <li>
                    <input
                      type="radio"
                      value="1"
                      name="time"
                      id="time_1"
                      onChange={handleTime}
                    />
                    <label htmlFor={"time_1"}>한주 이 내</label>
                  </li>
                  <li>
                    <input
                      id="time_2"
                      type="radio"
                      value="2"
                      name="time"
                      onChange={handleTime}
                    />
                    <label htmlFor={"time_2"}>한달 이 내</label>
                  </li>
                  <li>
                    <input
                      id="time_3"
                      type="radio"
                      value="3"
                      name="time"
                      onChange={handleTime}
                    />
                    <label htmlFor={"time_3"}>한달 이상</label>
                  </li>
                </ul>
              </>
            )}
          </Box>
        )}
        <AddBookBtn
          wish={wish}
          onClick={() => {
            clickWishlist(wish);
          }}
        >
          <Icon
            path={wish ? mdiHeart : mdiHeartOutline}
            size={size.width >= 768 ? `14px` : `16px`}
            color={`red`}
          ></Icon>
          <span>{wishNum}</span>
        </AddBookBtn>
        <AddBookBtn onClick={clickAddBook}>
          {" "}
          <Icon
            path={mdiBookPlusMultiple}
            size={size.width >= 768 ? `14px` : `16px`}
            color={`#666`}
          ></Icon>
          <span>책장에 추가</span>
        </AddBookBtn>
        {click && (
          <Box
            top={"45px"}
            left={size.width >= 768 ? "70px" : "calc(50% - 20px)"}
            width="180"
            textAlign="center"
          >
            <div>
              {booklist.length >= 1 ? (
                <>
                  <legend>내 책장 목록</legend>

                  {booklist.map(item => (
                    <div
                      className="myshelf"
                      onClick={async () => {
                        await bookApi.addToBooklist(book._id, item._id);
                        setClick(false);
                      }}
                      key={item._id}
                    >
                      {item.title}
                    </div>
                  ))}
                </>
              ) : (
                <legend>내 책장이 없습니다.</legend>
              )}
            </div>
          </Box>
        )}
      </ButtonTemplate>
    ) : null;

  useEffect(() => {
    getUser();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(statisticLocationChange, 5000);
  }, [statisticLocation]);

  useEffect(() => {
    if (readClick) {
      setStep(1);
    }
  }, [readClick]);

  useEffect(() => {
    if (step === 3) {
      clickDoneReading();
      setStep(0);
    }
  }, [step]);

  return (
    <>
      <Container>
        <LeftContainer image={String(book.image).replace("type=m1&", "")}>
          <img
            className="bookImage"
            src={String(book.image).replace("type=m1&", "")}
            alt={book.title}
          ></img>
        </LeftContainer>
        <RightContainer>
          <Item>
            <h1>{book.title}</h1>by {book.author}
            {size.width >= 768 && actionButtons}
          </Item>
          <Divider></Divider>
          <Item className="description">
            {book.description}
            <span>
              <SLink href={`${book.link}`} target="blank">
                자세히 더 보기
              </SLink>
            </span>
          </Item>

          <TableWrap>
            <Table>
              <TableLeft>작가/저자</TableLeft>
              <TableRight>{book.author}</TableRight>
            </Table>
            <Table>
              <TableLeft>출판사</TableLeft>
              <TableRight>{book.publisher}</TableRight>
            </Table>
            <Table>
              <TableLeft>카테고리</TableLeft>
              <TableRight>{book.category}</TableRight>
            </Table>
            <StatisticOuter>
              <StatisticWrap>
                <Statistic
                  max={maxNumTime}
                  arr={arrTime}
                  location={statisticLocation}
                  className={statisticLocation === 0 ? `` : `hidden`}
                >
                  <div className="title">이 책을 읽은 사람의 소요 시간</div>
                  <Divider className="sub" />
                  <ul>
                    <li>
                      <span className="type">1주 이내</span>
                      <span className="value-wrap">
                        <span className="value type0"></span>
                        {arrTime[0]}명
                      </span>
                    </li>
                    <li>
                      <span className="type">1개월 이내</span>
                      <span className="value-wrap">
                        <span className="value type1"></span>
                        {arrTime[1]}명
                      </span>
                    </li>
                    <li>
                      <span className="type">1개월 이상</span>
                      <span className="value-wrap">
                        <span className="value type2"></span>
                        {arrTime[2]}명
                      </span>
                    </li>
                  </ul>
                </Statistic>
                <Statistic
                  max={maxNumDifficulty}
                  arr={arrDifficulty}
                  location={statisticLocation}
                  className={statisticLocation === 0 ? `hidden` : ``}
                >
                  <div className="title">이 책을 읽은 사람이 느끼는 난이도</div>
                  <Divider className="sub" />
                  <ul>
                    <li>
                      <span className="type">쉬움</span>
                      <span className="value-wrap">
                        <span className="value type0"></span>
                        {arrDifficulty[0]}명
                      </span>
                    </li>
                    <li>
                      <span className="type">보통</span>
                      <span className="value-wrap">
                        <span className="value type1"></span>
                        {arrDifficulty[1]}명
                      </span>
                    </li>
                    <li>
                      <span className="type">어려움</span>
                      <span className="value-wrap">
                        <span className="value type2"></span>
                        {arrDifficulty[2]}명
                      </span>
                    </li>
                  </ul>
                </Statistic>
              </StatisticWrap>
            </StatisticOuter>
            {size.width < 768 && actionButtons}
          </TableWrap>
        </RightContainer>
        <ContentContainer>
          <CommentCotainer>
            <CommentTitle>
              의견쓰기{" "}
              <span> {allComment.length + comment.comments.length}개</span>
            </CommentTitle>
            <br />

            <CommentForm onSubmit={onSubmit}>
              <CommentSection
                placeholder={
                  isTokenExist !== null
                    ? "댓글을 입력해주세요"
                    : "댓글을 등록 하실려면 로그인 해주세요"
                }
                value={commentText}
                onChange={onChange}
              />
              <CommentSubmit type="submit">등록</CommentSubmit>
            </CommentForm>
            <br />

            <Divider></Divider>
            <CommentList>
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
    </>
  );
}

const ButtonTemplate = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1;
  @media only screen and (max-width: 767px) {
    position: relative;
    margin-top: 15px;
  }
  @media only screen and (min-width: 768px) {
    position: absolute;
    bottom: -5px;
    right: 0;
  }
`;

const AddBookBtn = styled.button`
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 15px;

  text-align: center;
  margin-right: 5px;
  background-color: ${props =>
    props.wish ? "#EEE" : props.doneReading ? "#EEE" : "#FFF"};
  &:hover {
    background-color: #ddd;
  }
  > span {
    margin-left: 5px;
    color: #666;
    font-weight: 500;
  }

  @media only screen and (max-width: 767px) {
    padding: 8px 16px;
    > span {
      font-size: 12px;
    }
  }
  @media only screen and (min-width: 768px) {
    padding: 5px 10px;
    > span {
      font-size: 11px;
    }
  }
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
    position: absolute;
    width: calc(100% + 20px);
    height: 300px;
    top: 0;
    left: -10px;
    right: -10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    > img.bookImage {
      display: block;
      width: 100%;
      max-width: 200px;
      margin: 0 auto;
      border-top: solid 1px rgba(255, 255, 255, 0.05);
      border-left: solid 1px rgba(255, 255, 255, 0.05);
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
      max-height: 280px;
      z-index: 10;
      margin-bottom: 5px;
    }

    &:before {
      background: Url(${props => props.image}) center;
      background-size: calc(100% + 20px);
      content: "";
      position: absolute;
      left: -10px;
      right: -10px;
      top: -10px;
      bottom: -10px;
      width: calc(100% + 20px);
      height: 320px;
      filter: blur(0.3rem);
      opacity: 0.5;
    }
  }

  @media only screen and (min-width: 768px) {
    width: 250px;
    float: left;

    > img.bookImage {
      width: 100%;
    }
  }
`;

const RightContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-top: 280px;
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

const TableWrap = styled.div`
  position: relative;
`;

const Table = styled.div`
  width: 100%;
  display: table;
`;

const TableLeft = styled.div`
  display: table-cell;
  padding: 5px 0;
  width: 70px;
  line-height: 16px;
  vertical-align: top;
  font-size: 14px;
  color: #999;
  text-align: left;
  white-space: nowrap;
`;

const TableRight = styled.div`
  display: table-cell;
  padding: 5px 0;
  line-height: 16px;
  vertical-align: top;
  font-size: 13px;
  color: #666;
  text-align: left;
`;

const Item = styled.div`
  margin-bottom: 10px;
  color: #333;
  position: relative;

  @media only screen and (max-width: 767px) {
    h1 {
      font-size: 22px;
    }
    &.description {
      color: #555;
      font-weight: 300;
      line-height: 20px;
      margin-bottom: 30px;
    }
  }

  @media only screen and (min-width: 768px) {
    &.description {
      color: #555;
      font-weight: 300;
      line-height: 20px;
      padding-right: 30px;
      margin-bottom: 30px;
    }
  }
`;
const StatisticOuter = styled.div`
   {
    @media only screen and (max-width: 767px) {
      margin-top: 15px;
      width: 100%;
      height: 78px;
      overflow: hidden;
    }

    @media only screen and (min-width: 768px) {
    }
  }
`;

const StatisticWrap = styled.div`
  @media only screen and (max-width: 767px) {
    width: 200%;
    height: 78px;
    overflow: hidden;
  }

  @media only screen and (min-width: 768px) {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 260px;
    height: 69px;
    overflow: hidden;
  }
`;

const Statistic = styled.div`
  @media only screen and (max-width: 767px) {
    display: inline-block;
    width: 50%;
    margin: 0 auto;
    transform: translateX(-${props => (props.location === 0 ? "0" : "100")}%);
    //transition: opacity 2s;
    transition: 1s;
    opacity: 1;
    &.hidden {
      opacity: 0;
    }

    .title {
      display: inline-block;
      color: #333;
      //background:#da3e58;
      font-size: 14px;
      font-weight: 600;
      padding-left: 10px;
    }
    ul {
      margin-top: 5px;
      width: 300px;
      li {
        display: flex;
        margin-botton: 3px;
        .type {
          display: inline-block;
          width: 100px;
          color: #666;
          font-size: 12px;
          font-weight: 400;
          padding-left: 10px;
        }
        .value-wrap {
          display: inline-block;
          color: #666;
          font-size: 10px;
          font-weight: 400;
          height: 17px;
          width: 200px;
          .value {
            display: inline-block;
            height: 8px;
            padding-right: 5px;
            margin-right: 5px;
            border-radius: 0 5px 5px 0;
            margin-top: 2px;
            &.type0 {
              width: ${props => (props.arr[0] / props.max) * 160}px;
              background: #3b94c7;
            }
            &.type1 {
              width: ${props => (props.arr[1] / props.max) * 160}px;
              background: #a70b9b;
            }
            &.type2 {
              width: ${props => (props.arr[2] / props.max) * 160}px;
              background: #1ab907;
            }
          }
        }
      }
    }
  }
  @media only screen and (min-width: 768px) {
    display: inline-block;
    transform: translateY(-${props => (props.location === 0 ? "0" : "69")}px);
    //transition: opacity 2s;
    transition: 1s;
    opacity: 1;
    &.hidden {
      opacity: 0;
    }

    .title {
      display: inline-block;
      color: #333;
      //background:#da3e58;
      font-size: 12px;
      font-weight: 600;
    }
    ul {
      margin-top: 5px;
      width: 260px;
      li {
        display: flex;
        margin-botton: 3px;
        .type {
          display: inline-block;
          width: 60px;
          color: #666;
          font-size: 11px;
          font-weight: 400;
        }
        .value-wrap {
          display: inline-block;
          color: #666;
          font-size: 10px;
          font-weight: 400;
          height: 14px;
          width: 200px;
          .value {
            display: inline-block;
            height: 8px;
            padding-right: 5px;
            margin-right: 5px;
            border-radius: 0 5px 5px 0;
            &.type0 {
              width: ${props => (props.arr[0] / props.max) * 160}px;
              background: #3b94c7;
            }
            &.type1 {
              width: ${props => (props.arr[1] / props.max) * 160}px;
              background: #a70b9b;
            }
            &.type2 {
              width: ${props => (props.arr[2] / props.max) * 160}px;
              background: #1ab907;
            }
          }
        }
      }
    }
  }
`;

const ContentContainer = styled.div`
  @media only screen and (max-width: 767px) {
    margin-top: 15px;
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    margin-top: 30px;
    width: 100%;
    float: left;
  }
`;

const CommentCotainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const CommentForm = styled.form`
  width: 100%;
  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;

const ComentTitle = styled.span`
  display: block;
  height: 40px;
  width: 60px;
  line-height: 40px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const CommentSection = styled.textarea`
  display: block;
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  height: 100px;
`;

const CommentSubmit = styled.button`
  margin-top: 5px;
  padding: 8px 20px;
  text-align: center;
  color: #fff;
  float: right;
  font-size: 13px;
  font-weight: 600;
  background: #da3e58;
  &:hover {
    opacity: 0.8;
  }
  border-radius: 15px;
`;

const CommentList = styled.ul`
  margin-top: -10px;
  list-style: none;
  letter-spacing: -0.7px;
`;

const CommentTitle = styled.span`
  display: block;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  > span {
    font-weight: 400;
  }
`;

const Box = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  text-align: ${props => props.textAlign};
  width: ${props => props.width}px;
  background: RGBA(255, 255, 255, 0.8);
  font-size: 13px;
  padding: 9px;
  border: 3px solid #777;
  letter-spacing: -0.1px;
  &:after {
    content: " ";
    width: 0;
    height: 0;
    position: absolute;
    left: 28px;
    top: -22px;
    border: 12px solid;
    border-color: transparent #fff #fff transparent;
  }
  &:before {
    content: " ";
    width: 0;
    height: 0;
    position: absolute;
    left: 25px;
    top: -30px;
    border: 15px solid;
    border-color: transparent #777 #777 transparent;
  }

  legend {
    display: inline-block;
    padding: 3px 5px;
    color: #333;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .myshelf {
    display: inline-block;
    padding: 5px 9px;
    background: RGBA(0, 0, 0, 0.7);
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;
    &:hover {
      background: RGBA(255, 30, 60, 0.9);
    }
  }

  ul {
    display: flex;
    letter-spacing: -0.1px;
    li {
      margin-right: 5px;
      label {
        display: inline-block;
        padding: 5px 9px;
        background: RGBA(0, 0, 0, 0.7);
        color: #fff;
        font-weight: 600;
        font-size: 12px;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background: RGBA(255, 30, 60, 0.9);
        }
      }
      input[type="radio"] {
        visibility: hidden;
        position: absolute;
      }
      input[type="radio"]:checked ~ label {
        background: RGBA(226, 1, 54, 0.7);
        &:hover {
          background: RGBA(255, 30, 60, 0.9);
        }
      }
    }
  }
`;

const SLink = styled.a`
  color: #4a6ee0;
`;
