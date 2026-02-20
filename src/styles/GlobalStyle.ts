import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  // ----- 기본 요소 스타일 초기화/설정 ----- //

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    //border: 1px solid;
  }

  /* 스크롤바 안 보이게 설정 */
  *::-webkit-scrollbar {
    display: none;
  }
  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  body {
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    font-family: 'Pretendard', sans-serif; /* TODO : 폰트 설정 */
  }

  /* GlobalStyle에서는 모바일 사이즈 외부 규격만 지정해둠
  페이지 내부 padding 등 여백은 각 레이아웃 컴포넌트에서 지정함*/
  #root {
    width: 100%;
    max-width: 540px;
    min-height: 100vh;
    
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    
    overflow: hidden; /* TODO : 스크롤 설정 */
    position: relative;
  }


  // ----- 기타 요소 스타일 초기화/설정 ----- //

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