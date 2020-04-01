import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Icon from "@mdi/react";
import {
  mdiBookPlusMultiple, // 책장에 추가
  mdiRead, // 읽음
  mdiAlphaRCircle,
  mdiHeart, // 좋아요
  mdiHeartOutline
} from "@mdi/js";

import useWindowSize from "./WindowSize";

const Book = ({
  bookItem,
  clickBook,
  recordBook,
  addBook,
  totalNum,
  profile,
  wish
}) => {
  const difficutlyUUID = uuidv4();
  const timeUUID = uuidv4();
  const size = useWindowSize();
  // const [time, setTime] = useState(bookItem.time);
  // const [difficulty, setDifficulty] = useState(bookItem.difficulty);
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [step, setStep] = useState(0);

  const clickEvent = () => {
    // 선택 안되있던 상태에서 선택 한 경우
    if (!bookItem.selected) {
      setStep(1);
    }
    clickBook(bookItem);
    bookItem.complete = bookItem.selected ? true : false;
    recordBook(bookItem);
  };

  const handleTime = e => {
    const {
      target: { value }
    } = e;

    bookItem.complete = value !== "" ? true : false;

    let valueS = parseInt(value);

    bookItem.time = parseInt(valueS);
    setTime(valueS);
    setStep(3);
    recordBook(bookItem);
  };

  const handledifficulty = e => {
    const {
      target: { value }
    } = e;

    bookItem.complete = value !== "" ? true : false;

    let valueS = parseInt(value);
    bookItem.difficulty = valueS;
    setDifficulty(valueS);
    setStep(2);
    recordBook(bookItem);
  };
  return (
    <Container>
      <ImageContainer>
        <Image
          bgUrl={String(bookItem.image).replace("type=m1&", "type=m5&")}
          onClick={() => {
            clickEvent(time, difficulty);
          }}
        >
          {bookItem.selected && <Check>선택 됨</Check>}
        </Image>
        <BookDesc>
          <p className="booktitle">{bookItem.title}</p>
          <p className="desc">
            {bookItem.author} 저 &nbsp; | &nbsp; {bookItem.publisher}
          </p>
        </BookDesc>
        {profile && (
          <div>
            <Heart>
              <Icon
                path={wish ? mdiHeart : mdiAlphaRCircle}
                size={size.width >= 768 ? `14px` : `16px`}
                color={wish ? `red` : `#666`}
              ></Icon>
              <span>{totalNum}</span>
            </Heart>
          </div>
        )}
        {bookItem.selected && addBook && (
          <Box>
            {step === 1 && (
              <FieldSet>
                <Legend>Q.읽기 어려우셨나요?</Legend>
                <ul className="difficulty">
                  <li>
                    <input
                      type="radio"
                      value="1"
                      name={difficutlyUUID}
                      id={difficutlyUUID + "_1"}
                      onChange={handledifficulty}
                    />
                    <label htmlFor={difficutlyUUID + "_1"}>쉬웠어요</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="2"
                      name={difficutlyUUID}
                      id={difficutlyUUID + "_2"}
                      onChange={handledifficulty}
                    />
                    <label htmlFor={difficutlyUUID + "_2"}>
                      읽을 만 했어요
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="3"
                      name={difficutlyUUID}
                      id={difficutlyUUID + "_3"}
                      onChange={handledifficulty}
                    />
                    <label htmlFor={difficutlyUUID + "_3"}>어려웠어요</label>
                  </li>
                </ul>
              </FieldSet>
            )}
            {step === 2 && (
              <FieldSet>
                <Legend>Q. 읽는데 걸린 시간?</Legend>
                <ul className="time">
                  <li>
                    <input
                      type="radio"
                      value="1"
                      name={timeUUID}
                      id={timeUUID + "_1"}
                      onChange={handleTime}
                    />
                    <label htmlFor={timeUUID + "_1"}>한주 이 내</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="2"
                      name={timeUUID}
                      id={timeUUID + "_2"}
                      onChange={handleTime}
                    />
                    <label htmlFor={timeUUID + "_2"}>한달 이 내</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="3"
                      name={timeUUID}
                      id={timeUUID + "_3"}
                      onChange={handleTime}
                    />
                    <label htmlFor={timeUUID + "_3"}>한달 이상</label>
                  </li>
                </ul>
              </FieldSet>
            )}
          </Box>
        )}
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  font-size: 12px;
`;

const Check = styled.div`
  position: absolute;
  background: rgba(44, 62, 80, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: block;
  box-sizing: border-box;
  margin: 0 5px;
  width: 188px;
  position: relative;
  padding-top: 250px;
  float: left;
`;

const Image = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 168px;
  height: 240px;
  background: url(${props => props.bgUrl}) no-repeat top;
  background-size: cover;
  //border: 1px solid black;
  border-radius: 0px;
  &:hover {
    opacity: 0.8;
    box-shadow: -2px -2px 5px 1px rgba(0, 0, 0, 1),
      2px 2px 5px 1px rgba(0, 0, 0, 1);
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const BookDesc = styled.div`
  width: 188px;
  padding: 10px 15px;
  min-height: 79px;

  > .booktitle {
    display: -webkit-box;
    min-height: 17px;
    max-height: 34px;
    line-height: 17px;
    word-break: break-all;
    overflow: hidden;
    font-size: 13px;
    color: #333;
    font-weight: 600;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  > .desc {
    margin-top: 10px;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 15px;
    min-height: 15px;
    max-height: 15px;
    font-size: 11px;
    color: #777;
    font-weight: 500;
  }
`;

const Box = styled.div`
  position: absolute;
  left: 15px;
  top: 40px;
  width: 156px;
`;

const ReadForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ReadInput = styled.input`
  all: unset;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;

  border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
`;

const ReadButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
`;

const FieldSet = styled.fieldset`
  text-align: center;
  legend {
    display: inline-block;
    padding: 5px 10px;
    background: RGBA(0, 0, 0, 0.7);
    color: #fff;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  ul {
    li {
      margin-bottom: 5px;
      label {
        display: inline-block;
        padding: 5px 10px;
        background: RGBA(0, 0, 0, 0.7);
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background: RGBA(255, 30, 60, 0.9);
        }
      }
      input[type="radio"] {
        visibility: hidden;
        position: absolute;
      }
      input[type="radio"]:checked ~ label {
        background: RGBA(226, 1, 54, 0.7);
        &:hover {
          background: RGBA(255, 30, 60, 0.9);
        }
      }
    }
  }
`;

const Legend = styled.legend`
  font-size: 13px;
`;

const Heart = styled.button`
  all: unset;
  display: flex;

  text-align: center;
  margin-right: 5px;
  background-color: "#FFF";

  > span {
    margin-left: 5px;
    color: #666;
    font-weight: 500;
  }

  @media only screen and (max-width: 767px) {
    padding: 8px 16px;
    > span {
      font-size: 12px;
    }
  }
  @media only screen and (min-width: 768px) {
    padding: 5px 10px;
    > span {
      font-size: 11px;
    }
  }
`;

export default Book;
