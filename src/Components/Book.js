import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Book = ({ bookItem, clickBook, recordBook, addBook }) => {
  const difficutlyUUID = uuidv4();
  const timeUUID = uuidv4();

  const [time, setTime] = useState(bookItem.time);
  const [difficulty, setDifficulty] = useState(bookItem.difficulty);

  const clickEvent = () => {
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

    recordBook(bookItem);
  };
  return (
    <Container>
      <ImageContainer>
        {bookItem.selected && <Check>선택 됨</Check>}
        <Image
          bgUrl={bookItem.image ? `${bookItem.image}` : null}
          onClick={() => {
            clickEvent(time, difficulty);
          }}
        />
      </ImageContainer>
      <Title>
        {bookItem.title.length > 18
          ? `${bookItem.title.substring(0, 18)}`
          : bookItem.title}
      </Title>
      {bookItem.selected && addBook && (
        <Box>
          <FieldSet>
            <legend>난이도</legend>
            <input
              type="radio"
              value="1"
              name={difficutlyUUID}
              checked={difficulty === 1}
              onChange={handledifficulty}
            />
            <label htmlFor="1">초급</label>

            <input
              type="radio"
              value="2"
              name={difficutlyUUID}
              checked={difficulty === 2}
              onChange={handledifficulty}
            />
            <label htmlFor="2">중급</label>
            <input
              type="radio"
              value="3"
              name={difficutlyUUID}
              checked={difficulty === 3}
              onChange={handledifficulty}
            />
            <label htmlFor="3">고급</label>
          </FieldSet>
          <FieldSet>
            <legend>읽는데 걸리 소요시간</legend>
            <input
              type="radio"
              value="1"
              name={timeUUID}
              checked={time === 1}
              onChange={handleTime}
            />
            <label htmlFor="1">한주 이 내</label>

            <input
              type="radio"
              value="2"
              name={timeUUID}
              checked={time === 2}
              onChange={handleTime}
            />
            <label htmlFor="2">한달 이 내</label>
            <input
              type="radio"
              value="3"
              name={timeUUID}
              checked={time === 3}
              onChange={handleTime}
            />
            <label htmlFor="3">한달 이상</label>
          </FieldSet>
          {/* <ReadInput
            type="number"
            placeholder="총 읽은 시간"
            name="time"
            onChange={handleTime}
            value={time}
            required
          /> */}
        </Box>
      )}
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

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.2s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;

  border: 1px solid black;
  border-radius: 4px;

  &:hover {
    ${Image} {
      opacity: 0.8;
      box-shadow: -2px -2px 5px 1px rgba(0, 0, 0, 1),
        2px 2px 5px 1px rgba(0, 0, 0, 1);
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Box = styled.div``;

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

const FieldSet = styled.fieldset``;

export default Book;
