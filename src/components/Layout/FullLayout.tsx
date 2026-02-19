import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background}; /* 임시 */
`;

const Content = styled.main`
  flex: 1;
`;

const FullLayout = ({ children }: { children: React.ReactNode, title?: string }) => {
  return (
    <Wrapper>
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};

export default FullLayout;