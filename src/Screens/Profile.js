import React, { useState, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import Comment from "../Components/Comment";
import Book from "../Components/Book";
import Section from "../Components/Section";

import { userApi, AuthApi, commentApi } from "../api";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";

export default function Profile({
  location: { pathname },
  match: {
    params: { userNickname }
  }
}) {
  const [tab, setTab] = useState("info");
  const [content, setContent] = useState();

  const history = useHistory();
  const [user, setUser] = useState({});
  const [comment, setComment] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [wishCount, setWishCount] = useState([]);
  const [readCount, setReadCount] = useState([]);
  const googleAuth = useGoogleAuth();
  const { signOut } = useGoogleAuth();
  const valid = useIsValid();

  const LogOut = () => {
    AuthApi.clearToken(signOut);
  };

  const initialize = authorized => {
    setContent(() => {
      return <Info user={authorized} />;
    });
  };

  const getUser = async () => {
    try {
      const authorized = await valid(googleAuth);
      setUser(authorized);

      const {
        data: {
          success,
          userCommentResult,
          wishData,
          readData,
          totalRead,
          totalWish
        }
      } = await userApi.getUserMyPage(authorized._id);

      if (success) {
        initialize(authorized);

        setComment(userCommentResult);
        setWishList(wishData);
        setReadList(readData);

        setWishCount(totalWish);
        setReadCount(totalRead);
      } else {
        history.push(`/404`);
      }
    } catch (err) {
      history.push(`/`);
    }
  };

  const bookDetail = async item => {
    history.push(`/book/${item.isbn}`);
  };

  const dummyFunction = async () => {};

  const deleteComments = async commentId => {
    try {
      const commentInfo = {
        commentId,
        userId: user._id
      };
      const {
        data: { success, userCommentResult }
      } = await commentApi.deleteCommentProfile(commentInfo);
      if (success) {
        setComment(userCommentResult);
      } else {
        history.push(`/404`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getStart = useMemo(() => {
    getUser();
  }, []);

  const changeTab = useMemo(() => {
    setContent(() => {
      switch (tab) {
        case "info":
          return <Info user={user} />;
        case "comment":
          return <Comments comment={comment} deleteComments={deleteComments} />;
        case "like":
          return (
            <Like
              wishList={wishList}
              bookDetail={bookDetail}
              dummyFunction={dummyFunction}
              wishCount={wishCount}
            />
          );
        case "read":
          return (
            <Read
              readList={readList}
              bookDetail={bookDetail}
              dummyFunction={dummyFunction}
              readCount={readCount}
            />
          );
        default:
          break;
      }
    });
  }, [tab, comment]);

  return (
    <Container>
      <Helmet>
        <title>My Page | WTB</title>
      </Helmet>
      <LogOutLink to="#" onClick={LogOut}>
        로그아웃
      </LogOutLink>
      <TabSection>
        <Tab
          onClick={() => {
            setTab("info");
          }}
        >
          내 정보
        </Tab>
        <Tab
          onClick={() => {
            setTab("comment");
          }}
        >
          내 댓글
        </Tab>
        <Tab
          onClick={() => {
            setTab("like");
          }}
        >
          좋아요한 책
        </Tab>
        <Tab
          onClick={() => {
            setTab("read");
          }}
        >
          읽은 책
        </Tab>
      </TabSection>
      {content}
    </Container>
  );
}

const Info = ({ user }) => {
  return (
    <div>
      <span>이름</span>
      <Spacer />
      <h3>{user.nickname}</h3>
      <SLink to={`/${user.email}/editprofile`}>edit</SLink>
      <Spacer />
      <span>나이</span>
      <Spacer />
      <h3>{user.age}</h3>
      <Spacer />
      <span>성별</span>
      <Spacer />
      <h3>{user.gender}</h3>
      <Spacer />
      <Spacer />
      <span>이메일</span>
      <Spacer />
      <h3>{user.email}</h3>
      <Spacer />

      <Spacer />
      {/* <Button onClick={deleteUser}>Delete Profile</Button> */}
      <Spacer />
    </div>
  );
};

const Comments = ({ comment, deleteComments }) => {
  return (
    <div>
      {comment.length >= 1 ? (
        comment.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            user={comment.user}
            book={comment.book}
            deleteComment={deleteComments}
          />
        ))
      ) : (
        <h1>작성 된 댓글이 없습니다.</h1>
      )}
    </div>
  );
};

const Like = ({ wishList, bookDetail, dummyFunction, wishCount }) => {
  return (
    <Section>
      {wishList.length >= 1 ? (
        wishList.map((item, index) => (
          <Book
            key={item.book.isbn}
            bookItem={item.book}
            clickBook={bookDetail}
            recordBook={dummyFunction}
            totalNum={wishCount[index]}
            profile={true}
          />
        ))
      ) : (
        <h1>좋아요 한 책이 없습니다.</h1>
      )}
    </Section>
  );
};

const Read = ({ readList, bookDetail, dummyFunction, readCount }) => {
  return (
    <Section>
      {readList.length >= 1 ? (
        readList.map((item, index) => (
          <Book
            key={item.book.isbn}
            bookItem={item.book}
            clickBook={bookDetail}
            recordBook={dummyFunction}
            totalNum={readCount[index]}
            profile={true}
          />
        ))
      ) : (
        <h1>읽은 책이 없습니다.</h1>
      )}
    </Section>
  );
};

const Container = styled.div`
  position: relative;
`;

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
  color: #4a6ee0;
`;

const LogOutLink = styled(Link)`
  color: #4a6ee0;
  position: absolute;
  right: 0;
`;

const Dividers = styled.div`
  width: 100%;
  border: 0.8px solid black;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const TabSection = styled.ul`
  margin-top: 10px;
`;

const Tab = styled.li`
  all: unset;
  margin-right: 20px;
  font-weight: 600;
  border-bottom: ${props =>
    props.active ? " 2px solid #DA3E58" : "transparent"};
  padding: 10px;
`;
