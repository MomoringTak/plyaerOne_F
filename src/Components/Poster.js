import React from "react";
import styled from "styled-components";

const Poster = ({
  id,
  title,
  imageUrl,
  author,
  description,
  pudbdate,
  isbn,
  isBook = false
}) => (
  <Container>
    <ImageContainer>
      <Image bgUrl={imageUrl ? `${imageUrl}` : null} />
    </ImageContainer>
    <Title>{title.length > 18 ? `${title.substring(0, 18)}...` : title}</Title>
  </Container>
);

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
