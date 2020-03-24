import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Book = ({ bookItem, clickBook, recordBook }) => {
  const uuid = uuidv4();
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  const clickEvent = () => {
    clickBook(bookItem);
  };

  const handleTime = e => {
    const {
      target: { value }
    } = e;

    setTime(value);

    bookItem.complete = value !== "" ? true : false;
    bookItem.time = value;

    recordBook(bookItem);
  };

  const handledifficulty = e => {
    const {
      target: { value }
    } = e;

    bookItem.difficulty = value;
    setDifficulty(value);

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
      {bookItem.selected && (
        <Box>
          <FieldSet>
            <legend>난이도를 알려주세요</legend>
            <input
              type="radio"
              value="1"
              name={uuid}
              defaultChecked
              onChange={handledifficulty}
            />
            <label htmlFor="1">초급</label>

            <input
              type="radio"
              value="2"
              name={uuid}
              onChange={handledifficulty}
            />
            <label htmlFor="2">중급</label>
            <input
              type="radio"
              value="3"
              name={uuid}
              onChange={handledifficulty}
            />
            <label htmlFor="3">고급</label>
          </FieldSet>
          <ReadInput
            type="number"
            placeholder="총 읽은 시간"
            name="time"
            onChange={handleTime}
            required
          />
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
