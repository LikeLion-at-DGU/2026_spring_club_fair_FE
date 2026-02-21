import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
  overflow: hidden;
`;

const HeaderLayout = () => {
  return (
    <Wrapper>
      <Outlet /> 
    </Wrapper>
  );
};

export default HeaderLayout;