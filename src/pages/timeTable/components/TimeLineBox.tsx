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
      <TimeSection>{time}</TimeSection>
      <InfoSection $active={isActive}>
        <ActiveInfoSection $active={isActive}>
          <InfoTextWrapper>
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
          </InfoTextWrapper>
        </ActiveInfoSection>
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

export const TimeSection = styled.div`
  display: flex;
  width: 41px;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  ${({ theme }) => theme.fonts.R_16};
  color: ${(props) => props.theme.colors.grey700};
  line-height: 155%;
`;
export const InfoSection = styled.div<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};

  border-top: 2px dashed ${(props) => props.theme.colors.grey300};
  margin-top: 10px;

  padding: 4px 0;
  box-sizing: border-box;
`;
export const ActiveInfoSection = styled.div<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-color: ${(props) =>
    props.$active ? props.theme.colors.green100 : props.theme.colors.white};
  border-radius: 4px;
`;

export const InfoTextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: center;
  gap: 6px;
`;
export const InfoText = styled.div<{ $active?: boolean }>`
  display: flex;
  ${({ theme }) => theme.fonts.SB_18};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.green900 : theme.colors.grey600};

  &.category {
    ${({ theme }) => theme.fonts.R_12};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.green700 : theme.colors.grey600};
  }
`;
