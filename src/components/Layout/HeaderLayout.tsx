import styled from 'styled-components';
import Header from './Header.tsx';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
`;

const Content = styled.main`
  flex: 1;
  padding: 20px 6%; 
`;

const Layout = ({ children }: { children: React.ReactNode, title?: string }) => {
  return (
    <Wrapper>
      <Header />
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};

export default Layout;