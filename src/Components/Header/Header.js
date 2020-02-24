import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth } from "../AuthG";

import LoginBtn from "./LoginBtn";

export default withRouter(({ location: { pathname } }) => {
  const { isSignedIn, googleUser } = useGoogleAuth();

  return (
    <Header>
      <Logo>
        <SLink to="/">WTB</SLink>
      </Logo>

      <List>
        <Item>
          <SLink to="/login">LOGIN</SLink>
        </Item>
        <Item>
          <SLink to="/">HOME</SLink>
        </Item>
        <Item>
          <SLink to="/shelf">SHELF</SLink>
        </Item>
        {isSignedIn && (
          <>
            <Item>
              <SLink to={`/${googleUser.profileObj.email}/shelf`}>
                USER SHELF
              </SLink>
            </Item>

            <Item>
              <SLink to={`/${googleUser.profileObj.email}/addbook`}>
                ADD BOOKS
              </SLink>
            </Item>
            <Item>
              <SLink to={`/${googleUser.profileObj.email}/profile`}>
                PROFILE
              </SLink>
            </Item>
          </>
        )}
      </List>

      <LoginBtn />

    </Header>
  );
});

const Header = styled.header`
  color: #c3c3c3;
  position: fixed;
  width:100%;
  height:70px;
  padding:20px;
  display: flex;

  background-color: #323439;
  border-radius: 2px;
  top:0;
  z-index:1;

`;

const List = styled.ul`
  display: flex;
  //flex-direction: column;
`;

const Item = styled.li`
  font-size:13px;
  text-align: left;
  margin-right:20px;
  line-height:30px;
  border-bottom:#323439 solid 1px;
  color:#BBB;

  transition: 0.5s;

  > a {
    display:block;
  }

  :hover {
    color: #FFF;
    border-bottom:#FFF solid 1px;
  }
`;
const SLink = styled(Link)`
`;

const Logo = styled.div`
  font-size: 2rem;
  line-height: 30px;
  margin-right:30px;

  transition: 0.5s;

  > a {
    display:block;
    line-height: 30px;
  }

  :hover {
    color:#FFF;
  }
`;
