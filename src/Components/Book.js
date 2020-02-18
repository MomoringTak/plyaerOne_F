import React, { useState } from "react";
import styled from "styled-components";

const Book = ({ bookItem, bookCollection, setBookCollection }) => {
  const [singleBook, setSingleBook] = useState(bookItem);

  const selectBook = e => {
    try {
      if (!singleBook.selected) {
        setSingleBook({ ...singleBook, selected: true });
      } else {
        setSingleBook({ ...singleBook, selected: false });
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
        {singleBook.selected && <Check></Check>}
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
  background: RGBA(255, 255, 255, 0.3);
  border: RED 3px solid;
  border-radius: 50%;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
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
