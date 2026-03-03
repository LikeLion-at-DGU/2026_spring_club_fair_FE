import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import arrowleft from '@assets/icons/fi-br-caret-left.svg';
import Home from '@assets/icons/fi-sr-home.svg';

// ----- style ----- //

const HeaderContainer = styled.header`
  width: 100%;
  height: 56px; 
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0; // TODO
`;

const Title = styled.span`
  flex-grow: 1;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey800};
  ${({ theme }) => theme.fonts.SB_16};
`;

const IconBtn = styled.img`
  cursor: pointer;
`;

// ----- interface ----- //

interface HeaderProps {
  title?: string;
  showHome?: boolean;
  onBack?: () => void;
}

// ----- ui ----- //

const Header = ({ title: propsTitle, showHome = true, onBack }: HeaderProps) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const PAGE_TITLES: Record<string, string> = {
    '/boothmap' : '부스 지도',
    '/test/result' : '결과 보기',
    '/timetable' : '타임테이블',
  };
  const displayTitle = propsTitle || PAGE_TITLES[pathname] || '뒤로가기';

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer>
      <IconBtn
        src={arrowleft}
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>{displayTitle}</Title>
      {showHome && (
        <IconBtn
          src={Home}
          alt="홈"
          onClick={() => navigate('/main')}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;