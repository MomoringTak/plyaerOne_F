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
  //width: 200px;
  width:100%;
  height:80px;
  padding:20px;
  display: flex;

  background-color: #323439;
  border-radius: 2px;

  top:0;

  //height: 100vh;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;

`;

const List = styled.ul`
  display: flex;
  //flex-direction: column;
`;

const Item = styled.li`
  text-align: left;
  margin-right:20px;
  line-height:40px;

  transition: border-bottom 1s ease-in-out;

  color:#BBB;

  :hover {
    color: #FFF;
  }
`;
const SLink = styled(Link)`
`;

const Logo = styled.div`
  font-size: 2rem;
  line-height: 40px;
  margin-right:30px;
  //position: absolute;
  //top: 20px;
`;
