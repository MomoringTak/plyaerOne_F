import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useWindowSize from "./WindowSize";

const SearchBar = ({ text, submitSearch }) => {
  const [searchText, setSearchText] = useState(text);
  const [visible, setVisible] = useState(false);
  const size = useWindowSize();
  const inputTextRef = React.createRef();

  const focusInputText = () => {
    if(size.width < 768){
      if(visible) {
        inputTextRef.current.focus();
        console.log(inputTextRef);
      }
    }
  }

  const clickEvent = e => {
    submitSearch(searchText);
    setSearchText("");
    clickVisible();
  };

  const clickVisible = e => {
    setVisible(!visible);
  };

  const _handleChange = e => {
    setSearchText(e.target.value);
  };

  const _handleKeyPress = e => {
    if (e.key === "Enter") {
      clickEvent();
    }
  };

  useEffect(() => {
    focusInputText();
  }, [visible]);

  return (
    <>
      { size.width >= 768 ? (
        <>
          <InputText
            type="text"
            value={searchText}
            onChange={_handleChange.bind(this)}
            onKeyPress={_handleKeyPress}
            placeholder="검색할 책의 정보를 입력해주세요."
          />
          <InputImage
            type="image"
            src="/img/common/ico_search.png"
            className="btn_search"
            onClick={clickEvent}
          />
        </>
      ) : (
        <>
          <InputImage
            type="image"
            className={visible ? `invisible` : ``}
            src="/img/common/ico_search.png"
            onClick={clickVisible}
          />
          <Overlay className={visible ? `` : `invisible`}>
            <InputText
              type="text"
              ref={inputTextRef}
              value={searchText}
              onChange={_handleChange.bind(this)}
              onKeyPress={_handleKeyPress}
              placeholder="검색할 책의 정보를 입력해주세요."
            />
            <InputImage
              type="image"
              className={`submit`}
              src="/img/common/ico_search.png"
              onClick={clickEvent}
            />
            <div className={`overlay-close`} onClick={clickVisible}></div>
          </Overlay>
        </>
      )}
    </>
  );
};

const InputText = styled.input`
  // PC
  @media only screen and (min-width: 768px) {
    width: 238px;
    height: 36px;
    padding: 0 50px 0 20px;
    border: 1px solid #f7f7f6;
    border-radius: 18px;
    background-color: #f7f7f7;
    font-family: "Noto Sans";
    font-weight: 400;
    font-size: 12px;
    color: #666;
    line-height: 16px;
    outline: none;
    letter-spacing: -0.05em;
  }
  // Mobile
  @media only screen and (max-width: 767px) {
    width: 100%;
    height: 50px;
    padding: 0 50px 0 15px;
    border: 4px solid #da3e58;
    background-color: #f7f7f7;
    font-family: "Noto Sans";
    font-weight: 600;
    font-size: 18px;
    color: #333;
    line-height: 22px;
    outline: none;
    letter-spacing: -0.05em;
  }
  
`;

const InputImage = styled.input`
  // PC
  @media only screen and (min-width: 768px) {
    position: absolute;
    right: 10px;
    top: 3px;
    width: 30px;
    height: 30px;
  }
  // Mobile
  @media only screen and (max-width: 767px) {
    position: absolute;
    right: 10px;
    top: 15px;
    width: 30px;
    height: 30px;
    &.invisible{
      display:none;
    }
    &.submit{
      top:10px;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  &.invisible{
    display:none;
  }
  .overlay-close{
    width:100%;
    height:100%;
  }
`;

export default SearchBar;
