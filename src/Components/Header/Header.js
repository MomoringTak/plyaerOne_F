import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";

import { useGoogleAuth, useIsValid } from "../AuthG";

import LoginBtn from "./LoginBtn";
import SearchBar from "../SearchBar";
import { AuthApi } from "../../api";
import useWindowSize from "../WindowSize";
import useFloatBtnActive from "../FloatBtnActivate";

import Icon from "@mdi/react";
import {
  mdiHome,
  mdiHomeOutline,
  mdiBook,
  mdiBookOutline,
  mdiBookshelf,
  mdiAccount,
  mdiBookPlus
} from "@mdi/js";

export default withRouter(({ location: { pathname } }) => {
  
  const history = useHistory();

  const [menuHover, setMenuHover] = useState(false);
  const [subMenuHover, setSubMenuHover] = useState(false);

  const [user, setUser] = useState([]);
  const valid = useIsValid();

  const googleAuth = useGoogleAuth();
  const isTokenExist = AuthApi.getToken();

  const size = useWindowSize();
  const icon = useFloatBtnActive();

  const getUser = async () => {
    const authorized = await valid(googleAuth);
    setUser(authorized);
  };

  const searchBook = searchText => {
    console.log("in searchBook" + searchText);
    history.push(
      {
        pathname: `/search`,
        search: `?keyword=${searchText}`
      }
    );
  };

  const enterMenu = () => {
    setMenuHover(true);
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

  const pathCheck = () => {
    switch (pathname) {
      case "/":
        return "home";
      case "/books":
        return "book";
      case "/shelf":
        return "shelf";
      default:
        return "";
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Header>
      {size.width >= 768 ? (
        <>
          <HeaderBanner>
            <BannerLink to="#">WHAT THE BOOKS 헤더 띠 배너!</BannerLink>
          </HeaderBanner>
          <HeaderUser>
            <UserMenuUl>
              {isTokenExist !== null ? (
                <UserMenuLi>
                  <UserLink to={`/${user.nickname}/profile`}>내 정보</UserLink>
                </UserMenuLi>
              ) : null}
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
                <SLink to="/books">
                  <span className="txt">오늘의 책</span>
                </SLink>
              </Item>
              <Item>
                <SLink to="/">
                  <span className="txt">테마가 있는 책장</span>
                </SLink>
              </Item>
              {isTokenExist !== null && (
                <Item>
                  <SLink to={`/${user.nickname}/shelf`}>
                    <span className="txt">나의책장</span>
                  </SLink>
                </Item>
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
                  {isTokenExist !== null ? (
                    <SSubLink to={`/${user.nickname}/addbook`}>
                      <span className="txt">책 추가하기</span>
                    </SSubLink>
                  ) : null}
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
            <div className="iconAddBook">
              <Link to={`/addbook`}>
                <Icon path={mdiBookPlus} size={0.85} />
              </Link>
            </div>
            <div className="searchbar">
              <SearchBar text="" submitSearch={searchBook}></SearchBar>
            </div>
          </HeaderMenu>
        </>
      ) : (
        <>
          <HeaderBanner>
            <BannerLink to="#">WHAT THE BOOKS 헤더 띠 배너!</BannerLink>
          </HeaderBanner>
          <HeaderLogo>
            <LogoLink to="/">
              <Logo src="/img/wtblogo_r.png" alt="WHAT THE BOOKS" />
            </LogoLink>
            <div className="searchbar">
              <SearchBar text="" submitSearch={searchBook}></SearchBar>
            </div>
          </HeaderLogo>
          <HeaderMenu>
            <List>
              <Item>
                <MenuLink to="/" className={pathCheck() === "home" && "active"}>
                  <Icon path={mdiHome} size={1.4} />
                  <MenuText>홈</MenuText>
                </MenuLink>
              </Item>
              <Item>
                <MenuLink
                  to="/books"
                  className={pathCheck() === "book" && "active"}
                >
                  <Icon path={mdiBookOutline} size={1.4} />
                  <MenuText>책</MenuText>
                </MenuLink>
              </Item>
              <Item>
                <MenuLink
                  to="/shelf"
                  className={pathCheck() === "shelf" && "active"}
                >
                  <Icon path={mdiBookshelf} size={1.4} />
                  <MenuText>책묶음</MenuText>
                </MenuLink>
              </Item>
              <Item>
                <MenuLink
                  to="/profile"
                  className={pathCheck() === "my" && "active"}
                >
                  <Icon path={mdiAccount} size={1.4} />
                  <MenuText>My</MenuText>
                </MenuLink>
              </Item>
            </List>
          </HeaderMenu>
          <div className={icon ? "footer-button active" : "footer-button"}>
            {isTokenExist !== null && (
              <button className="button-float">
                <Link to={`/addbook`}>
                  <Icon path={mdiBookPlus} size={1} />
                </Link>
              </button>
            )}
            <button className="button-float button-top">
              <span>to the Top</span>
            </button>
          </div>
        </>
      )}
    </Header>
  );
});

const MenuText = styled.span`
  display: block;
  line-height: 16px;
  font-size: 10px;
`;

const MenuLink = styled(Link)`
  display: block;
  margin: 10px 5px 0px;
  padding: 3px;
  width: calc(100% - 10px);
  text-align: center;
  text-decoration: none;
  color: #60656a;
  //border-radius:20px;

  svg path {
    fill: #60656a;
  }

  &.active {
    //background:RGBA(226, 1, 54, 0.7);
    svg path {
      fill: RGBA(226, 1, 54, 0.7);
    }
    span {
      color: RGBA(226, 1, 54, 0.7);
    }
    //border-bottom: RGBA(226, 1, 54, 0.7) solid 1px;
  }
`;

const Header = styled.header`
  position: relative;
  z-index: 300;

  @media only screen and (min-width: 768px) {
    &:after {
      content: "";
      position: absolute;
      z-index: 299;
      left: 0;
      width: 100%;
      height: 9px;
      background: url(/img/common/bg_1x9.png) repeat-x 0 100%;
    }
  }

  @media only screen and (max-width: 767px) {
    border-bottom: 0.5px solid #efefef;

    .footer-button {
      z-index: 56;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 80px;
      right: 0px;
      transform: translateX(110%);
      overflow: visible;
      background: #000;

      .button-float {
        width: 50px;
        height: 50px;
        margin-bottom: 8px;
        border-radius: 50%;
        font-size: 14px;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
        background-color: RGBA(226, 1, 54, 0.7);
        color: #fff;
        cursor: pointer;
        transition: all 0.5s ease;
        text-align: center;

        svg path {
          fill: #fff;
        }

        &.button-top {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border: 1px solid #dedede;
          transition: all 0.9s ease;

          span {
            font-size: 0;
            color: #fff;
            &:before {
              content: "";
              display: block;
              width: 10px;
              height: 2px;
              background-color: #555;
              margin-top: 2px;
              margin-left: 1px;
            }
            &:after {
              content: "";
              display: block;
              width: 6px;
              height: 6px;
              margin-top: 4px;
              margin-left: 2px;
              border: solid #555;
              border-width: 0 2px 2px 0;
              transform: rotate(-135deg);
            }
          }
        }
      }

      &.active {
        button {
          transform: translateX(-80px);
        }
      }
    }
  }
`;

const HeaderBanner = styled.div`
  position: relative;
  min-width: 800px;
  text-align: center;
  line-height: 42px;
  font-size: 14px;

  @media only screen and (max-width: 767px) {
    min-width: 0;
    width: 100%;
    line-height: 30px;
    font-size: 12px;
  }
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
  @media only screen and (min-width: 768px) {
    float: right;
    line-height: 32px;
  }
`;
const UserMenuLi = styled.li`
  @media only screen and (max-width: 767px) {
  }

  @media only screen and (min-width: 768px) {
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
  }
`;

const HeaderLogo = styled.div`
  width: 100%;
  height: 30px;
  position: relative;

  @media only screen and (max-width: 767px) {
    height: 56px;
    position: relative;
    margin-bottom: 5px;
  }
`;
const HeaderMenu = styled.div`
  @media only screen and (max-width: 767px) {
    display: block;
    width: 100%;
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

    .iconAddBook {
      position: absolute;
      right: -40px;
      top: 10px;
      width: 36px;
      height: 36px;
      padding: 7.8px;
      border-radius: 50%;
      background: #f7f7f7;
      svg path {
        fill: #333;
      }
    }
  }
`;

const List = styled.ul`
  @media only screen and (max-width: 767px) {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    transform: translateY(0);
    transition: transform 0.25s;
    z-index: 1;
    margin-left: 0;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    padding: 0 0 max(8px, env(safe-area-inset-bottom));
    width: 100%;
    list-style: none;
  }

  @media only screen and (min-width: 768px) {
    float: left;
    width: 100%;
  }
`;

const Item = styled.li`
  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    float: left;
    background: url(/img/common/line_1x11_c_ccc.png) no-repeat 100% 23px;

    &.all {
      > a {
        padding-left: 0px;
      }
    }

    &:last-child {
      background: none;
    }
  }
`;

const SLink = styled(Link)`
  overflow: hidden;
  float: left;
  height: 55px;
  padding: 16px 31px 0 29px;
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

  @media only screen and (max-width: 767px) {
    height: 30px;
  }
`;
const LogoLink = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 3px;
  margin-left: -66px;

  @media only screen and (max-width: 767px) {
    margin-left: -51px;
  }
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

  @media only screen and (max-width: 767px) {
    width: 102px;
    height: 40.8px;
    margin-right: 0;
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
