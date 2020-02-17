import React, { useState } from "react";
import styled from "styled-components";

const Poster = ({
  book,
  selectBook
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = event => {
    selectBook(event);
    setSelected(book.selected);
  };

  return(
  <Container className={book.selected ? `selected` : null}>
    <ImageContainer>
      <Image bgUrl={book.image ? `${book.image}` : null} onClick={handleSelect} />
    </ImageContainer>
    <Title>{book.title.length > 18 ? `${book.title.substring(0, 18)}...` : book.title}</Title>
  </Container>
)};

const Container = styled.div`
  font-size: 12px;
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
