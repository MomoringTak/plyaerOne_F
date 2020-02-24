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
        {/* <Item>
          <SLink to="/login">LOGIN</SLink>
        </Item>
        <Item>
          <SLink to="/">HOME</SLink>
        </Item> */}
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
  
  position: fixed;
  width:100%;
  height:70px;
  padding:20px;
  display: flex;

  background-color: RGB(20,20,20);
  //background-color: #323439;
  border-radius: 2px;
  top:0;
  z-index:1;
`;

const List = styled.ul`
  display: flex;
  //flex-direction: column;
`;

const Item = styled.li`
  font-size:12px;
  text-align: left;
  margin-right:24px;
  line-height:30px;
  border-bottom:RGB(20,20,20) solid 1px;
  color:#E5E5E5;
  font-weight:400;

  transition: 1s;

  > a {
    display:block;
  }

  :hover {
    color: #666;
    border-bottom:#333 solid 1px;
  }
`;
const SLink = styled(Link)`
`;

const Logo = styled.div`
  width:120px;
  margin-right:30px;
  line-height: 30px;
  font-weight:600;
  font-size: 2rem;
  color:#E5E5E5;
  text-align:center;

  transition: 0.5s;

  > a {
    line-height: 30px;
  }

  :hover {
    color:#AAA;
  }
`;
