import React from "react";
import styled from "styled-components";

const Book = ({ bookItem, clickBook }) => {
  const clickEvent = e => {
    clickBook(bookItem);
  };

  return (
    <Container>
      <ImageContainer>
        {bookItem.selected && <Check>선택 됨</Check>}
        <Image
          bgUrl={bookItem.image ? `${bookItem.image}` : null}
          onClick={clickEvent}
        />
      </ImageContainer>
      <Title>
        {bookItem.title.length > 18
          ? `${bookItem.title.substring(0, 18)}`
          : bookItem.title}
      </Title>
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

export default Book;
