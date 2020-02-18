import React, { useState } from "react";
import styled from "styled-components";

const Book = ({ bookItem, bookCollection, setBookCollection, count }) => {
  const [singleBook, setSingleBook] = useState(bookItem);

  const selectBook = e => {
    try {
      if (!singleBook.selected) {
        setSingleBook({ ...singleBook, selected: true });
        count(prev => prev + 1);
      } else {
        setSingleBook({ ...singleBook, selected: false });
        count(prev => prev - 1);
      }
    } catch (e) {
      console.log(e);
    }

    //filter the array of object to find the object equals to the clicked book
    bookCollection.filter(
      x => x.title === singleBook.title
    )[0].selected = !bookCollection.filter(x => x.title === singleBook.title)[0]
      .selected;

    setBookCollection(bookCollection);
  };

  return (
    <Container>
      <ImageContainer>
        {singleBook.selected && <Check>선택 됨</Check>}
        <Image
          bgUrl={bookItem.image ? `${bookItem.image}` : null}
          onClick={selectBook}
        />
      </ImageContainer>
      <Title>
        {bookItem.title.length > 18
          ? `${bookItem.title.substring(0, 18)}...`
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
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

export default Book;
