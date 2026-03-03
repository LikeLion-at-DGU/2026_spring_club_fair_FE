import styled from "styled-components";
import arrowLeft from "@assets/icons/fi-br-caret-left.svg";
import arrowRight from "@assets/icons/fi-sr-caret-right.svg";

interface TabProps {
  $isActive?: boolean;
}

interface CategoryTabProps {
  text: string;
  showArrow?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// ----- style ----- //

const TabWrapper = styled.div<TabProps & { $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 20px;

  border: 1px solid ${(props) => 
    props.$disabled ? props.theme.colors.grey100 :
    (props.$isActive ? props.theme.colors.green600 : props.theme.colors.grey400)};
  background-color: ${(props) => 
    props.$disabled ? props.theme.colors.grey50 :
    (props.$isActive ? props.theme.colors.green200 : "white")};
  color: ${(props) => 
    props.$disabled ? props.theme.colors.grey300 :
    (props.$isActive ? "#333333" : props.theme.colors.black)};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  user-select: none;
  gap: 4px;
`;

const TabText = styled.span<TabProps>`
  ${({ theme }) => theme.fonts.R_16};
`;

const StyledIcon = styled.img`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
`;

// ----- ui ----- //

const CategoryTab = ({ text, showArrow = false, isActive = false, disabled = false, onClick }: CategoryTabProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <TabWrapper $isActive={isActive} $disabled={disabled} onClick={onClick}>
      <TabText $isActive={isActive}>{text}</TabText>
      {showArrow && (
        <StyledIcon 
          src={isActive ? arrowLeft : arrowRight} 
          alt={isActive ? "닫기" : "열기"} 
        />
      )}
    </TabWrapper>
  );
};

export default CategoryTab;