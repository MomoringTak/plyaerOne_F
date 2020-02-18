import React, { useState } from "react";
import styled from "styled-components";

const Poster = ({ book, selectBook }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = event => {
    selectBook(event);
    setSelected(book.selected);
  };

  return (
    <Container>
      <ImageContainer>
        {selected && <Check></Check>}
        <Image
          bgUrl={book.image ? `${book.image}` : null}
          onClick={handleSelect}
        />
      </ImageContainer>
      <Title>
        {book.title.length > 18
          ? `${book.title.substring(0, 18)}...`
          : book.title}
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

export default Poster;
