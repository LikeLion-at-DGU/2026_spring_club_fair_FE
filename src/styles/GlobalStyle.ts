import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

//베라폰트 -스플래시,메인에만 사용 
@font-face {
  font-family: 'BR-B';
  src: url('/fonts/BR-B.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'BR-R';
  src: url('/fonts/BR-R.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
// 펴진고딕
@font-face {
  font-family: 'PyeojinGothic-Black';
  src: url('/fonts/PyeojinGothic-Black.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'PyeojinGothic-Extrabold';
  src: url('/fonts/PyeojinGothic-Extrabold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'PyeojinGothic-Bold';
  src: url('/fonts/PyeojinGothic-Bold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'PyeojinGothic-Semibold';
  src: url('/fonts/PyeojinGothic-Semibold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'PyeojinGothic-Medium';
  src: url('/fonts/PyeojinGothic-Medium.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'PyeojinGothic-Regular';
  src: url('/fonts/PyeojinGothic-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'PyeojinGothic-Light';
  src: url('/fonts/PyeojinGothic-Light.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}


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
    //font-family: 'PyeojinGothic-Regular', sans-serif;
  }

  /* GlobalStyle에서는 모바일 사이즈 외부 규격만 지정해둠
  페이지 내부 padding 등 여백은 각 페이지 컴포넌트에서 지정함 */
  #root {
    width: 100%;
    max-width: 540px;
	  min-height: calc(var(--vh, 1vh) * 100);
    
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    
    overflow: hidden;
    position: relative;
    user-select: none;
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
