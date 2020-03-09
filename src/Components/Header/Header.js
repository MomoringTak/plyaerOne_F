import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth } from "../AuthG";

import LoginBtn from "./LoginBtn";
import SearchBar from "../SearchBar";

export default withRouter(({ location: { pathname } }) => {
  const { isSignedIn, googleUser } = useGoogleAuth();
  const [menuHover, setMenuHover] = useState(false);
  const [subMenuHover, setSubMenuHover] = useState(false);

  const size = useWindowSize();

  const searchBook = searchText => {
    console.log(searchText);
    alert(searchText);
  };

  const enterMenu = () => {
    setMenuHover(true);
    //setSubMenuHover(true);
  };
  const leaveMenu = () => {
    setMenuHover(false);
  };
  const enterSubMenu = () => {
    setSubMenuHover(true);
  };
  const leaveSubMenu = () => {
    setSubMenuHover(false);
  };

  return (
    <Header>
      {size.width >= 768 ? (
        <>
          <HeaderBanner>
            <BannerLink to="#">WHAT THE BOOKS 헤더 띠 배너!</BannerLink>
          </HeaderBanner>
          <HeaderUser>
            <UserMenuUl>
              {isSignedIn && (
                <UserMenuLi>
                  <UserLink to={`/${googleUser.profileObj.email}/profile`}>
                    내 정보
                  </UserLink>
                </UserMenuLi>
              )}
              <UserMenuLi>
                <LoginBtn />
              </UserMenuLi>
            </UserMenuUl>
          </HeaderUser>
          <HeaderLogo>
            <LogoLink to="/">
              <Logo src="/img/wtblogo_r.png" alt="WHAT THE BOOKS" />
            </LogoLink>
          </HeaderLogo>
          <HeaderMenu>
            <List>
              {/* <Item>
                <SLink to="/login">LOGIN</SLink>
              </Item> */}
              <Item className="all">
                <SLink
                  to="#"
                  className={(menuHover || subMenuHover) && "hover"}
                  onMouseEnter={enterMenu}
                  onMouseLeave={leaveMenu}
                >
                  <span className="ico"></span>
                  <span className="txt">전체메뉴</span>
                </SLink>
              </Item>
              <Item>
                <SLink to="/">
                  <span className="txt">오늘의 책</span>
                </SLink>
              </Item>
              <Item>
                <SLink to="/">
                  <span className="txt">테마가 있는 책장</span>
                </SLink>
              </Item>
              {/* <Item>
                <SLink to="/shelf">SHELF</SLink>
              </Item> */}
              {isSignedIn && (
                <>
                  <Item>
                    <SLink to={`/${googleUser.profileObj.email}/shelf`}>
                      <span className="txt">나의책장</span>
                    </SLink>
                  </Item>
                  {/* <Item>
                    <SLink to={`/${googleUser.profileObj.email}/addbook`}>
                      <span className="txt">+Book</span>
                    </SLink>
                  </Item> */}
                </>
              )}
            </List>
            {(menuHover || subMenuHover) && (
              <SubMenuUl
                onMouseEnter={enterSubMenu}
                onMouseLeave={leaveSubMenu}
              >
                <SubMenuLi>
                  <SubLink to="#">
                    <span className="txt">오늘의 책</span>
                  </SubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">새로운 책</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">추천 책</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">책 추가하기</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SubLink to="#">
                    <span className="txt">테마가 있는 책장</span>
                  </SubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">장르별..?</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">관심사별..?</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">성별..?</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SubLink to="#">
                    <span className="txt">나만의 메뉴</span>
                  </SubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">내 책장</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">프로필</span>
                  </SSubLink>
                </SubMenuLi>
                <SubMenuLi>
                  <SSubLink to="#">
                    <span className="txt">나의 활동</span>
                  </SSubLink>
                </SubMenuLi>
              </SubMenuUl>
            )}
            {/* 검색창 */}
            <div className="searchbar">
              <SearchBar text="" submitSearch={searchBook}></SearchBar>
            </div>
          </HeaderMenu>
        </>
      ) : (
        <></>
      )}
    </Header>
  );
});

//component화 시켜야됨
function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const Header = styled.header`
  position: relative;
  z-index: 300;
  &:after {
    content: "";
    position: absolute;
    z-index: 299;
    left: 0;
    width: 100%;
    height: 9px;
    background: url(/img/common/bg_1x9.png) repeat-x 0 100%;
  }
`;

const HeaderBanner = styled.div`
  position: relative;
  min-width: 800px;
  text-align: center;
  line-height: 42px;
  font-size: 14px;
`;

const HeaderUser = styled.div`
  //display:flex;
  //justify-content: flex-end;
  width: 100%;
  height: 50px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 9px 0;
`;

const UserMenuUl = styled.ul`
  float: right;
  line-height: 32px;
`;
const UserMenuLi = styled.li`
  float: left;
  color: #333;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;

  &:after {
    content: "";
    float: right;
    width: 1px;
    height: 13px;
    margin-top: 9px;
    background-color: #d8d8d8;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
`;

const HeaderLogo = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
`;
const HeaderMenu = styled.div`
  @media only screen and (max-width: 767px) {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    position: relative;
    width: 800px;
    height: 56px;
    margin: 0 auto;

    .searchbar {
      position: absolute;
      right: 0px;
      top: 10px;
      width: 238px;
    }
  }
`;

const List = styled.ul`
  float: left;
  width: 100%;
`;

const Item = styled.li`
  float: left;
  background: url(/img/common/line_1x11_c_ccc.png) no-repeat 100% 23px;

  &.all {
    > a {
      padding-left: 4px;
    }
  }

  &:last-child {
    background: none;
  }
`;

const SLink = styled(Link)`
  overflow: hidden;
  float: left;
  height: 55px;
  padding: 16px 35px 0 33px;
  font-size: 16px;
  color: #333;
  line-height: 20px;

  span.txt {
    font-weight: 700;
    font-family: "Noto Sans";
  }
  span.ico {
    background: url(/img/common/ico_menu_all_off.png) no-repeat 0 0;
    background-size: 16px 14px;
    float: left;
    width: 16px;
    height: 14px;
    margin: 4px 14px 0 0;
  }

  &:hover,
  &.hover {
    span.txt {
      color: #da3e58;
      border-bottom: 1px solid #da3e58;
    }
    span.ico {
      background: url(/img/common/ico_menu_all.png) no-repeat 0 0;
      background-size: 16px 14px;
    }
  }
`;

const BannerLink = styled(Link)`
  display: block;
  height: 42px;
  background-color: #da3e58;
  color: #fff;
  font-family: "Noto Sans";
`;
const LogoLink = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 3px;
  margin-left: -60px;
`;

const UserLink = styled(Link)`
  float: left;
  padding: 0 10px;
  font-family: "Noto Sans";
`;

const Logo = styled.img`
  width: 136px;
  height: 54.4px;
  margin-right: 30px;
  line-height: 30px;
  font-weight: 600;
  font-size: 2rem;
  color: #e5e5e5;
  text-align: center;

  transition: 0.5s;

  > a {
    line-height: 30px;
  }

  :hover {
    color: #aaa;
  }
`;

const SubMenuUl = styled.ul`
  position: absolute;
  left: -20px;
  top: 56px;
  z-index: 300;
  display: block;
  width: 200px;
  background: #f8f8f8;
  border: 1px solid RGB(0, 0, 0, 0.3);
  padding-bottom: 5px;
`;
const SubMenuLi = styled.li`
  display: block;
  width: 100%;

  a:hover {
    span.txt {
      color: #da3e58;
      border-bottom: 1px solid #da3e58;
    }
  }
`;

const SubLink = styled(Link)`
  padding: 15px 15px 10px;
  width: 100%;
  height: 45px;
  display: block;
  background: #fff;
  color: #333;
  font-size: 14px;
  font-weight: 600;
`;
const SSubLink = styled(Link)`
  padding: 10px 15px;
  padding-left: 30px;
  width: 100%;
  height: 40px;
  display: block;
  background: #f8f8f8;
  color: #333;
  font-size: 13px;
  font-weight: 500;
`;
