import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header.tsx';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
`;

const Content = styled.main`
  flex: 1;
  padding: 20px 6%;
  overflow-y: auto;
  
  // 내부 요소 정렬 목적
  display: flex;
  flex-direction: column;
`;

const HeaderLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Content>
        <Outlet /> 
      </Content>
    </Wrapper>
  );
};

export default HeaderLayout;