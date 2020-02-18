import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AddBookList = () => {
  return (
    <Container>
      <Card>
        <Form>
          <Input />
          <Input />
          <Input />
          <Input />
        </Form>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-left: 200px;
  height: 100vh;
`;

const Card = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.4);
`;

const Head = styled.div`
  margin: 20px 20px;
`;

const Title = styled.span`
  display: block;
  font-weight: 600;
  font-size: 2rem;
`;

const Spacer = styled.div`
  height: 15px;
`;

const Section = styled.div`
  font-weight: 500;
  color: #8189a9;
`;

const Form = styled.form``;

const Input = styled.input`
  all: unset;
  border-bottom: 1px solid black;
  text-align: center;
  padding: 5px;
`;

const SLink = styled(Link)`
  margin-top: 10px;
  color: #4a6ee0;
`;

export default AddBookList;
