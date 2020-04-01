import styled from "styled-components";

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #ccc;

  @media only screen and (max-width: 767px) {
    margin: 10px 0;
  }
  @media only screen and (min-width: 768px) {
    margin: 15px 0;
  }

  &.sub {
    margin-top: 3px;
    margin-bottom: 5px;
  }
`;

const MobileList = styled.div`
    @media only screen and (max-width: 767px) {    
        display: flex;
        width: 100%;
        overflow: hidden;
        overflow-x: auto;
        scroll-behavior: smooth;
    }
    @media only screen and (min-width: 768px) {
    }
`;

export { Divider, MobileList };