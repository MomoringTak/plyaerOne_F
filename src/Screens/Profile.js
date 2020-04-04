import React, { useState, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import Comment from "../Components/Comment";
import Book from "../Components/Book";
import Section from "../Components/Section";

import { userApi, AuthApi, commentApi } from "../api";

import { useGoogleAuth, useIsValid } from "../Components/AuthG";

import Icon from "@mdi/react";
import { mdiBookshelf } from "@mdi/js";

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
      return <Info user={authorized} LogOut={LogOut} />;
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
          return <Info user={user} LogOut={LogOut} />;
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

const Info = ({ user, LogOut }) => {
  return (
    <Section>
      <UserContainer>
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
        <ShelfLink to={`/${user.nickname}/shelf`}>
          <Icon path={mdiBookshelf} size={`15px`} color={`#c71a37`}></Icon>
          <span>나의 책장</span>
        </ShelfLink>
        <LogOutLink to="#" onClick={LogOut}>
          로그아웃
        </LogOutLink>
        {/* <Button onClick={deleteUser}>Delete Profile</Button> */}
      </UserContainer>
    </Section>
  );
};

const Comments = ({ comment, deleteComments }) => {
  return (
    <Section>
      {comment.length >= 1 ? (
        comment.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            user={comment.user}
            book={comment.book}
            deleteComment={deleteComments}
            profile={true}
            wish={true}
          />
        ))
      ) : (
        <span>작성 된 댓글이 없습니다.</span>
      )}
    </Section>
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
            wish={true}
          />
        ))
      ) : (
        <span>좋아요 한 책이 없습니다.</span>
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
        <span>읽은 책이 없습니다.</span>
      )}
    </Section>
  );
};

const Container = styled.div`
  position: relative;
`;

const Spacer = styled.div`
  height: 15px;
`;

const SLink = styled(Link)`
  color: #4a6ee0;
`;

const LogOutLink = styled(Link)`
  display: none;

  @media only screen and (max-width: 767px) {
    color: #4a6ee0;
    min-widight: 30px;
    font-size: 12px;
    display: inline;
  }
`;

const TabSection = styled.ul`
  margin-top: 10px;
`;

const Tab = styled.li`
  all: unset;
  margin-right: 20px;
  font-weight: 600;

  cursor: pointer;
  border-bottom: ${props =>
    props.active ? " 2px solid #DA3E58" : "transparent"};
  padding: 10px;
`;

const UserContainer = styled.div`
  margin-top: 20px;
`;

const ShelfLink = styled(Link)`
  display: none;
  @media only screen and (max-width: 767px) {
    position: absolute;
    color: #c71a37;
    display: flex;
    padding: 0 10px;
    width: 100px;
    height: 27px;
    line-height: 25px;
    border: 0.5px solid #da3e58;
    background: inherit;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    top: 45px;
    right: 0;
    svg {
      margin: 5px 3px 5px 0px;
    }
    &:hover {
      path {
        fill: #fff !important;
      }
      background: #ef5d76;
      color: #fff;
    }
  }
`;
