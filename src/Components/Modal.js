import React from "react";
import styled from "styled-components";

const Modal = ({ clickBtn, click, children }) => (
  <Container clicked={click}>
    <ModalTemplate>
      <CloseBtn onClick={clickBtn}>❌</CloseBtn>
      {children}
    </ModalTemplate>
  </Container>
);

export default Modal;

const Container = styled.div`
  position: absolute;
  display: ${props => (props.clicked ? "block" : "none")};
  width: 360px;
  height: 360px;
  border: 1px solid black;
  margin-left: calc(50% - 180px);
  margin-top: calc(50% - 180px);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ModalTemplate = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;
