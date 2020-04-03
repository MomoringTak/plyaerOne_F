import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import { useGoogleAuth, useIsValid } from "../Components/AuthG";
import { booklistApi, AuthApi } from "../api";

import Table from "../Components/Table";
import List from "../Components/List";
import Icon from "@mdi/react";
import {
  mdiBookshelf
} from "@mdi/js";

const UserShelf = ({
  location: { pathname },
  match: {
    params: { userNickname }
  }
}) => {
  const history = useHistory();
  const googleAuth = useGoogleAuth();

  const [user, setUser] = useState({});
  const [booklist, setBooklist] = useState([]);
  const valid = useIsValid();

  const booklistDetail = async item => {
    history.push(`/booklist/${item}`);
  };

  const deleteBL = async item => {
    try {
      const {
        data: {
          booklist: { booklists }
        }
      } = await booklistApi.deleteBookList(item, user.email);
      const NEW_BL = booklists.map(item => {
        item.userBL = true;
        return item;
      });
      setBooklist(NEW_BL);
    } catch (e) {
      console.log(e);
    }
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
      data: { success, logDataResult }
    } = await booklistApi.getAllReadLog(logger);
    if (!success) {
      history.push(`/404`);
    }
  };

  const showBookList = async user => {
    try {
      if (user.length !== 0) {
        const {
          data: {
            booklist: { booklists },
            success
          }
        } = await booklistApi.getBookList(user.email);
        if (success) {
          const NEW_BL = booklists.map(item => {
            item.userBL = true;
            return item;
          });
          setBooklist(NEW_BL);
        } else {
          history.push(`/404`);
        }
      }
    } catch (err) {
      if (err.response !== undefined) AuthApi.checkAuth(err.response.data);
    }
  };

  const getUser = async () => {
    //주소 닉네임 아이디 출력
    //아이디출력에 따라서 해당 유저 책장이 달라보여야됨. 2020.03.31
    // console.log(userNickname);
    const authorized = await valid(googleAuth);
    setUser(authorized);
    showBookList(authorized);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <div className="title">여기는 <span className="nick">{user.nickname}</span>님의 책장 입니다.</div>

      <SLink to={`/${user.email}/addbooklist`}><Icon path={mdiBookshelf} size={`15px`} color={`#c71a37`}></Icon><span>책장 생성하기</span></SLink>
      <Table>
        {booklist.length >= 1 ? (
          booklist.map(item => (
            <List
              key={item._id}
              booklist={item}
              clickBooklist={booklistDetail}
              deleteBL={deleteBL}
              user={user._id}
            />
          ))
        ) : (
          <h1>책장이 비어져있습니다.</h1>
        )}
      </Table>
    </Container>
  );
};

const Container = styled.div`
  .title{
    color: #3074B5;
    font-size: 21px;
    letter-spacing: -2px;
    padding-bottom: 25px;
    .nick {
      font-weight:500;
      margin-left:3px;
      margin-right:3px;
    }
  }
`;

const SLink = styled(Link)`
  color: #c71a37;
  position: absolute;
  display: flex;
  padding: 0 10px;
  height: 27px;
  line-height: 25px;
  border: 0.5px solid #da3e58;
  background:#ffdce2;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  top: 30px;
  right: 0px;
  svg {
    margin:5px 3px 5px 0px;
  }
  &:hover{
    path {
      fill:#FFF!important;
    }
    background:#ef5d76;
    color:#FFF;
  }
`;

export default UserShelf;
