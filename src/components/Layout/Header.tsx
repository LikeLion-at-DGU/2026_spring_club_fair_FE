import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Header = () => {
  return (
    <HeaderContainer>
      뒤로가기 (헤더미완)
    </HeaderContainer>
  );
};

export default Header;