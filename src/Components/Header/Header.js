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
      <LoginBtn />

      <List>
        <Item>
          <SLink to="/login">Login</SLink>
        </Item>
        <Item>
          <SLink to="/">Home</SLink>
        </Item>
        <Item>
          <SLink to="/shelf">Shelf</SLink>
        </Item>
        {isSignedIn && (
          <>
            <Item>
              <SLink to={`/${googleUser.profileObj.email}/shelf`}>
                UserShelf
              </SLink>
            </Item>

            <Item>
              <SLink to={`/${googleUser.profileObj.email}/addbook`}>
                Add Book
              </SLink>
            </Item>
            <Item>
              <SLink to={`/${googleUser.profileObj.email}/profile`}>
                Profile
              </SLink>
            </Item>
          </>
        )}
      </List>
    </Header>
  );
});

const Header = styled.header`
  color: #c3c3c3;
  position: fixed;
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  background-color: #323439;
  border-radius: 2px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  width: 80px;
  text-align: center;
  transition: border-bottom 0.3s ease-in-out;

  :hover {
    color: white;
  }
`;
const SLink = styled(Link)`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  font-size: 2rem;
`;
