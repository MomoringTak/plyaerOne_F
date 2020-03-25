import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ text, submitSearch }) => {
  const [searchText, setSearchText] = useState(text);

  const clickEvent = e => {
    submitSearch(searchText);
    setSearchText("");
  };

  const _handleChange = e => {
    setSearchText(e.target.value);
  };

  const _handleKeyPress = e => {
    if (e.key === "Enter") {
      clickEvent();
    }
  };

  return (
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
  );
};

const InputText = styled.input`
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
`;

const InputImage = styled.input`
  position: absolute;
  right: 10px;
  top: 3px;
  width: 30px;
  height: 30px;
`;

export default SearchBar;
