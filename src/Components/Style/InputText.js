import styled from "styled-components";

const InputText = styled.input`
width: 100%;
height: 54px;
padding: 0 19px;
border: 1px solid #ccc;
border-radius: 3px;
background-color: #fff;
font-size: 14px;
line-height: 20px;
outline: none;
&:not(:first-child){
  margin-top:10px;
}
&::placeholder{color:#ccc;opacity:1}
`;

export default InputText;