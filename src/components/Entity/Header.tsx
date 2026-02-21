import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Title = styled.span`
  flex-grow: 1;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey800};
`;

const IconBtn = styled.img`
  cursor: pointer;
`;

// ----- interface ----- //

interface HeaderProps {
  title: string;
  showHome?: boolean;
}

// ----- ui ----- //

const Header = ({ title, showHome = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <IconBtn 
        src={arrowleft} 
        alt="뒤로가기" 
        onClick={() => navigate(-1)} 
      />
      <Title>{title}</Title>
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