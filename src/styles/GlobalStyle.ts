import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    font-family: 'Pretendard', sans-serif;
  }

  #root {
    width: 100%;
    max-width: 393px;
    min-height: 100vh;
    
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    
    overflow-x: hidden;
    position: relative;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }
`;

export default GlobalStyle;