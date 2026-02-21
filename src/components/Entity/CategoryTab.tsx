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
  onClick?: () => void;
}

// ----- style ----- //

const TabWrapper = styled.div<TabProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$isActive ? props.theme.colors.green600 : props.theme.colors.grey400)};
  background-color: ${(props) => (props.$isActive ? props.theme.colors.green200 : "white")};
  cursor: pointer;
  user-select: none;
  gap: 4px;
`;

const TabText = styled.span<TabProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.$isActive ? "#333333" : props.theme.colors.black)};
`;

const StyledIcon = styled.img`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
`;

// ----- ui ----- //

const CategoryTab = ({ text, showArrow = false, isActive = false, onClick }: CategoryTabProps) => {
  return (
    <TabWrapper $isActive={isActive} onClick={onClick}>
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