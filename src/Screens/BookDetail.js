import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { bookApi, booklistApi, commentApi, AuthApi, userApi } from "../api";

import reducer, { initialState, ADD, DEL } from "../Components/Reducer/reducer";
import Comment from "../Components/Comment";

import Modal from "../Components/Modal";
import useWindowSize from "../Components/WindowSize";

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
    if (isTokenExist !== null) saveComment();
    else {
      alert("댓글을 등록하시려면 로그인 해주세요");
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
        booklist: { booklists }
      }
    } = await booklistApi.getBookList(user.email);
    setBooklist(booklists);
  };

  const getReadLogger = async (userId, bookId) => {
    const logData = {
      user: userId,
      book: bookId
    };

    const {
      data: { logResult }
    } = await userApi.getReadLogger(logData);
    if (logResult !== null) {
      setWish(logResult.wish);
      setDoneReading(logResult.doneReading);
    }
    setReadLogger(logResult);
  };

  const showBook = async user => {
    //get all info about the book.
    try {
      const {
        data: { book: Results }
      } = await bookApi.getBookDetail(id);

      setBook(Results);

      /* 
      wishNumber : 해당 책이 가지고있는 좋아요 갯수
      readNumber : 해당 책이 읽힌 횟수 
      maxTime : 가장 많이 선택된 읽음 소요 시간
      maxDifficulty : 가장 많이 선택된 난이도 
      averageTime : 시간 소요 전체 분포도 as Object Type
      averageDiffculty : 난이도 전체 분포도 as Object Type
      */
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
      setMaxNumDifficulty(maxTmpTime);
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
      await userApi.handleWish(logData);
      setWish(!wish);
    }
  };

  //하아 시바 인풋 핸들링. 꼭 따로 펑셔널하게 만든다. 시부엉 넘나 Redudunt && Inefficient
  const handleTime = e => {
    const {
      target: { value }
    } = e;
    let valueS = parseInt(value);
    setTime(valueS);
  };

  const handledifficulty = e => {
    const {
      target: { value }
    } = e;
    setDifficulty(value);
  };

  const clickDoneReading = async e => {
    if (e) {
      e.preventDefault();
    }
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

    await userApi.handleRead(logData);
    setDoneReading(!doneReading);
  };

  const cancelReading = async () => {
    const logData = {
      user: user._id,
      book: book._id,
      doneReading: !doneReading
    };

    await userApi.handleRead(logData);
    setDoneReading(!doneReading);
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
      </ButtonTemplate>
    ) : null;

  useEffect(() => {
    getUser();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(statisticLocationChange, 5000);
  }, [statisticLocation]);

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
          <Item className="description">{book.description}</Item>
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
            {size.width < 768 && actionButtons}
          </TableWrap>
        </RightContainer>
        <ContentContainer>
          <CommentCotainer>
            <CommentForm onSubmit={onSubmit}>
              <ComentTitle>댓글쓰기</ComentTitle>
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
            <br />
            <br />
            <CommentTitle>
              댓글 <span>{allComment.length}개</span>
            </CommentTitle>
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
      <Modal clickBtn={clickAddBook} click={click}>
        <div>
          {booklist.length >= 1 ? (
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
      </Modal>
      <Modal clickBtn={clickReadBook} click={readClick}>
        <Box>
          <ReadForm onSubmit={clickDoneReading}>
            <FieldSet>
              <legend>난이도를 알려주세요</legend>
              <input
                id="1"
                type="radio"
                value="1"
                name="difficulty"
                defaultChecked
                onChange={handledifficulty}
              />
              <label htmlFor="1">초급</label>

              <input
                id="2"
                type="radio"
                value="2"
                name="difficulty"
                onChange={handledifficulty}
              />
              <label htmlFor="2">중급</label>
              <input
                id="3"
                type="radio"
                value="3"
                name="difficulty"
                onChange={handledifficulty}
              />
              <label htmlFor="3">고급</label>
            </FieldSet>
            <FieldSet>
              <legend>읽는데 걸리 소요시간</legend>
              <input
                type="radio"
                value="1"
                name="time"
                defaultChecked
                onChange={handleTime}
              />
              <label htmlFor="1">한주 이 내</label>

              <input type="radio" value="2" name="time" onChange={handleTime} />
              <label htmlFor="2">한달 이 내</label>
              <input type="radio" value="3" name="time" onChange={handleTime} />
              <label htmlFor="3">한달 이상</label>
            </FieldSet>
            <ReadButton>Submit</ReadButton>
          </ReadForm>
        </Box>
      </Modal>
    </>
  );
}

const ButtonTemplate = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 767px) {
    margin-top: 15px;
  }
  @media only screen and (min-width: 768px) {
    position: absolute;
    bottom: -5px;
    right: 0;
  }
`;

const AddBookBtn = styled.button`
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
  overflow: hidden;
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

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #ccc;

  @media only screen and (max-width: 767px) {
    margin: 10px 0;
  }
  @media only screen and (min-width: 768px) {
    margin: 15px 0;
  }

  &.sub {
    margin-top: 3px;
    margin-bottom: 5px;
  }
`;

const StatisticWrap = styled.div`
  @media only screen and (max-width: 767px) {
    margin-top: 15px;
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

const Box = styled.div``;

const ReadForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ReadInput = styled.input`
  all: unset;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;

  border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
`;

const ReadButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
`;
const FieldSet = styled.fieldset``;
