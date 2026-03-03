import { Outlet, useLocation, matchPath } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Entity/Header';

const Wrapper = styled.div`
  max-width: 540px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
  overflow: hidden;
`;

const ContentArea = styled.div`
  margin-top: 56px;
  flex: 1;
  overflow-y: scroll;
`;

const HeaderLayout = () => {
  const { pathname } = useLocation();
  // 동적 제목이 필요한 경로 (헤더를 수동으로 넣음)
  const manualHeaderPaths = ['/test', '/booth/:id', '/foodtruck/:id'];
  const isManualHeader = manualHeaderPaths.some((path) =>
    matchPath({ path, end: false }, pathname),
  );

  return (
    <Wrapper>
      {!isManualHeader && <Header />}
      <ContentArea>
        <Outlet />
      </ContentArea>
    </Wrapper>
  );
};

export default HeaderLayout;
