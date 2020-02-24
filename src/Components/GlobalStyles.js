import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing: border-box;

    }
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:14px;
        background-color: #FFF;
        
    }
    button{
        all:unset;
        cursor:pointer
    }
    .Container{        
        border: 2px solid red;
        display: flex;
        justify-content: center;
        font-size: 3rem;
        color: black;
        margin-left: 200px;
    }

    h1 {
        font-size: 30px;
        color:#000;
        font-weight:600;
        margin:15px 0 10px;
    }
    
`;

export default globalStyles;
