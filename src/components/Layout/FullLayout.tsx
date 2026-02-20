import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.green50}; /* 임시 */
`;

const Content = styled.main`
  flex: 1;
  padding: 20px 6%; 
`;

const FullLayout = () => {
  return (
    <Wrapper>
      <Content>
        <Outlet /> 
      </Content>
    </Wrapper>
  );
};

export default FullLayout;