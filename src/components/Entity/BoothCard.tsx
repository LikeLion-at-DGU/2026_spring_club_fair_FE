import type { BoothCardData } from '@/types/booth';
import arrowRight from '@assets/icons/fi-sr-caret-right.svg';
import clock from '@assets/icons/fi-sr-clock.svg';
import marker from '@assets/icons/fi-sr-marker.svg';
import { flexStart, flexColumn, ellipsis, flexEnd } from '@styles/mixins';
import styled from 'styled-components';
import { testResults } from '@/mocks/testResults';

interface Props {
  booth: BoothCardData;
  width?: number;
  height?: number;
  isActive?: boolean;
  onClick?: () => void;
  onDetailClick?: () => void;
}

const BoothCardWrapper = styled.div<{ $width?: number; $height?: number; $isActive? : boolean }>`
  ${flexColumn}
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}px;
  margin: 0 auto;
  padding: var(--M, 8px);
  border-radius: var(--XL, 16px);
  border: 1px solid ${(props) => 
    props.$isActive ? props.theme.colors.green500 : "var(--Grey-grey-400, #bdbebf)"};
  
  background: ${(props) => 
    props.$isActive ? props.theme.colors.green50 : "var(--whie, #fff)"};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  //overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.15s;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.18);
  }
`;

const ContentContainer = styled.div`
    ${flexStart}
    width: 100%;
    gap: 16px;
`;

const BoothImage = styled.img`
  width: 95px;
  height: 126px;
  border-radius: var(--M, 8px);
  background: var(--Grey-grey-500, #adaeaf);
  object-fit: cover;
  flex-shrink: 0;
`;

const BoothInfo = styled.div`
  padding-top: 8px;
  gap: 4px;
  ${flexColumn}
  flex: 1;
  height: 100%;
  min-width: 0; /* Necessary for ellipsis to work in flex children */
`;

const BoothDivison = styled.div<{ $bgColor?: string }>`
  width: fit-content;
  padding: 4px 8px;
  font-size: 12px;
  color: #fff;
  background-color: ${(props) => props.$bgColor || '#E67979'};
  border-radius: 4px;
  ${ellipsis}
`;

const BoothTitle = styled.p`
  color: var(--black, #121212);
  font-family: 'Pyeojin Gothic';
  font-size: 18px;
  font-weight: 600;
  ${ellipsis}
`;

const BoothDate = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.colors.grey600};
  ${ellipsis}
  gap: 8px;
  ${flexStart}
  img {
    width: 14px;
    height: 14px;
  }
`;

const BoothLocation = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.colors.grey600};
  ${ellipsis}
  gap: 8px;
  ${flexStart}
  img {
    width: 14px;
    height: 14px;
  }
`;

const DetailButton = styled.button`
  ${flexEnd}
  align-items: center;
  background: none;
  border: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey600};
  font-weight: 400;
  cursor: pointer;
  margin-top: auto;
  padding: 0;

  img {
    margin-top: -2px;
    width: 14px;
    height: 14px;
  }
`;

const formatDate = (dateStr: string) => {
  const [, month, day] = dateStr.split('-');
  return `${Number(month)}월 ${Number(day)}일`;
};

const BoothCard = ({ booth, isActive, width = 91, height = 144, onClick, onDetailClick }: Props) => {

  const isFoodTruck = booth.type === 'FOODTRUCK';
  
  // type = 푸드트럭/부스 기준으로 분리
  const divisionInfo = Object.values(testResults).find(
    (res) => res.division === booth.division,
  );
  const bgColor = isFoodTruck ? '#FF823F' : divisionInfo?.color;
  const labelText = isFoodTruck ? '푸드트럭' : booth.division;

  return (
    <BoothCardWrapper $width={width} $height={height} $isActive={isActive} onClick={onClick}>
      <ContentContainer>
        <BoothImage src={booth.image} alt={booth.name} />
        <BoothInfo>
          <BoothDivison $bgColor={bgColor} id='booth_division'>
            {labelText}
          </BoothDivison>
          <BoothTitle>{booth.name}</BoothTitle>
          <BoothDate>
            <img src={clock} alt='clock' />
            {booth.dates.map(formatDate).join(', ')}
          </BoothDate>
          <BoothLocation>
            <img src={marker} alt='marker' />
            {booth.location}
          </BoothLocation>
          <DetailButton onClick={(e) => {
            e.stopPropagation();
            onDetailClick && onDetailClick();
          }}>
            자세히 보기
            <img src={arrowRight} alt='arrow-right' />
          </DetailButton>
        </BoothInfo>
      </ContentContainer>
    </BoothCardWrapper>
  );
};

export default BoothCard;
