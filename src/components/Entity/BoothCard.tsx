import type { BoothCardData } from "@/types/booth";
import arrowRight from "@assets/icons/fi-sr-caret-right.svg";
import lion from "@assets/images/lion.png";
import clock from "@assets/icons/fi-sr-clock.svg";
import marker from "@assets/icons/fi-sr-marker.svg";
import { flexStart, flexColumn, ellipsis, flexEnd } from "@styles/mixins";
import styled from "styled-components";
import { testResults } from "@/mocks/testResults";

interface Props {
  booth: BoothCardData;
  width?: number;
  height?: number;
  isActive?: boolean;
  onClick?: () => void;
  onDetailClick?: () => void;
}

const formatDate = (dateStr: string) => {
  const [, month, day] = dateStr.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
};

const BoothCard = ({
  booth,
  isActive,
  width = 100,
  height = 144,
  onClick,
  onDetailClick,
}: Props) => {
  const isFoodTruck = booth.type === "FOODTRUCK";

  // type = 푸드트럭/부스 기준으로 분리
  const divisionInfo = Object.values(testResults).find(
    (res) => res.division === booth.division,
  );
  const bgColor = isFoodTruck ? "#FF823F" : divisionInfo?.color;
  const labelText = isFoodTruck ? "푸드트럭" : booth.division;

  return (
    <BoothCardWrapper
      $width={width}
      $height={height}
      $isActive={isActive}
      onClick={onClick}
    >
      <ContentContainer>
        <BoothImage src={booth.image || lion} alt={booth.name} />
        <BoothInfo>
          <BoothDivison $bgColor={bgColor} id="booth_division">
            {labelText}
          </BoothDivison>
          <BoothTitle>{booth.name}</BoothTitle>
          <BoothDate>
            <img src={clock} alt="clock" />
            {booth.dates.map(formatDate).join(", ")}
          </BoothDate>

          <BoothLocation>
            <img src={marker} alt="marker" />
            {isFoodTruck
              ? // 임시로 .. TODO
                booth.location.split(" ")[0]
              : booth.location}
          </BoothLocation>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {booth.hasDetail && (
              <DetailButton
                onClick={(e) => {
                  e.stopPropagation();
                  const handleDetail = onDetailClick || onClick;
                  handleDetail?.();
                }}
              >
                자세히 보기
                <img src={arrowRight} alt="arrow-right" />
              </DetailButton>
            )}
          </div>
        </BoothInfo>
      </ContentContainer>
    </BoothCardWrapper>
  );
};

export default BoothCard;

const BoothCardWrapper = styled.div<{
  $width?: number;
  $height?: number;
  $isActive?: boolean;
}>`
  ${flexColumn}
  width: ${(props) => props.$width}%;
  height: ${(props) => props.$height}px;
  margin: 0 auto;
  padding: var(--M, 8px);
  border-radius: var(--XL, 16px);
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.colors.green500
        : "var(--Grey-grey-400, #bdbebf)"};

  background: ${(props) =>
    props.$isActive ? props.theme.colors.green50 : "var(--whie, #fff)"};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  //overflow: hidden;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
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
  background: var(--Grey-grey-500, #ffffff);
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
  ${({ theme }) => theme.fonts.R_12};
  color: #fff;
  background-color: ${(props) => props.$bgColor || "#E67979"};
  border-radius: 4px;
  ${ellipsis}
`;

const BoothTitle = styled.p`
  color: var(--black, #121212);
  ${({ theme }) => theme.fonts.SB_18};
  font-size: 18px;
  font-weight: 600;
  ${ellipsis}
`;

const BoothDate = styled.div`
  ${({ theme }) => theme.fonts.R_14};
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
  ${({ theme }) => theme.fonts.R_14};
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
  width: fit-content;
  ${flexEnd}
  align-items: center;
  background: none;
  border: none;
  margin: 8px;
  ${({ theme }) => theme.fonts.R_12};
  color: ${({ theme }) => theme.colors.grey600};
  cursor: pointer;
  margin-top: auto;
  padding: 0;

  img {
    width: 14px;
    height: 14px;
  }
`;
