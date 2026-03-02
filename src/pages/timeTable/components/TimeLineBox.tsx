import styled from 'styled-components';

interface TimeLineBoxProps {
  time: string;
  team?: string;
  category?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TimeLineBox = ({
  time,
  team,
  category,
  isActive,
  onClick,
}: TimeLineBoxProps) => {
  return (
    <Wrapper onClick={onClick} style={{ cursor: 'pointer' }}>
      <TimeSection $active={isActive}>{time}</TimeSection>
      <InfoSection $active={isActive}>
        {team ? (
          <InfoText $active={isActive}>{team}</InfoText>
        ) : (
          <InfoText $active={isActive}>-</InfoText>
        )}
        <InfoText className='category' $active={isActive}>
          /
        </InfoText>
        {category ? (
          <InfoText className='category' $active={isActive}>
            {category}
          </InfoText>
        ) : (
          <InfoText className='category' $active={isActive}>
            -
          </InfoText>
        )}
      </InfoSection>
    </Wrapper>
  );
};

export default TimeLineBox;

export const Wrapper = styled.div`
  display: flex;
  gap: 7px;
  width: 100%;
  height: 50px;
`;

export const TimeSection = styled.div<{ $active?: boolean }>`
  display: flex;
  width: 41px;
  height: 100%;
  align-items: flex-start;
  //align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fonts.R_16};
  color: ${(props) =>
    props.$active ? props.theme.colors.black : props.theme.colors.grey700};
  line-height: 155%;
`;
export const InfoSection = styled.div<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  /* background-color: ${(props) => props.theme.colors.grey100}; */

  border-top: 2px dashed
    ${(props) =>
      props.$active ? props.theme.colors.black : props.theme.colors.grey300};
  //border-top: 2px dashed ${(props) => props.theme.colors.grey300};
  margin-top: 10px;
`;

export const InfoText = styled.div<{ $active?: boolean }>`
  display: flex;
  ${({ theme }) => theme.fonts.SB_18};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.black : theme.colors.grey600};

  &.category {
    ${({ theme }) => theme.fonts.R_12};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.black : theme.colors.grey600};
  }
`;
