import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header.tsx';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh; //
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px 6%;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.green100};
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