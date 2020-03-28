import styled from "styled-components";

const Box = styled.div`
// Mobile
@media only screen and (max-width: 767px) {
  width:calc(100% - 50px);
  padding-top: 20px;
}
// PC
@media only screen and (min-width: 768px) {
  width: 340px;
  padding-top: 90px;
}

color:#333;
margin: 0 auto;
letter-spacing: -0.6px;

.tit_login{
  font-weight: 800;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
}
`;

const Form = styled.form`
width: 100%;
padding-top:30px;
`;

const SignButton = styled.button`
  margin-top: 10px;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 54px;
  border-radius: 3px;
  text-align: center;

  
  font-weight: 500;
  font-size: 16px;

  border: 1px solid #da3e58;
  background-color: #fff;
  color:#da3e58;

  &.submit {
    border: 1px solid #da3e58;
    background-color: #da3e58;
    color:#FFF;
  }
  &.register {
    border: 1px solid #da3e58;
    background-color: #fff;
    color:#da3e58;
  }
  &.google {
    margin-top:30px;
    border: 1px solid #1a73e8;
    background-color: #1a73e8;
    color:#FFF;
  }

  text-align:center;

`;

export { Box, Form, SignButton };