import React from "react";
import styled from "styled-components";
import ManhaeGround from "@assets/images/만해광장.png";
import PalJeongDo from "@assets/images/팔정도.png";

// ----- style ----- //

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const LocationTabSection = styled.div`
  height: 35px;
  display: flex;
  gap: 8px;
  padding: 0 16px;

  button {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px 8px 0 0;
    background-color: ${(props) => props.theme.colors.grey200};
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.grey50};
    cursor: pointer;
    //transition: all 0.2s; /* TODO : 애니메이션 고민 */

    &.active {
      background-color: ${(props) => props.theme.colors.green900};
      color: white;
      font-weight: 600;
    }
  }
`;

const MapWrapper = styled.div`
  position: relative; // Dots 좌표 표시용
  width: 100%;
  //aspect-ratio: 540 / 448; 
  background-color: #ffffff;
  overflow: hidden;
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  //object-fit: contain; /* TODO : 지도 왜곡 확인 필요 */
`;

// 임시좌표
const TempDot = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  top: ${(props) => props.$x}%; 
  left: ${(props) => props.$y}%;
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.theme.colors.green600};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;


// ----- ui ----- //

interface MapProps {
    activeLocation: 'manhae' | 'paljeongdo';
    onLocationChange: (loc: 'manhae' | 'paljeongdo') => void;
}

const Map = ({activeLocation, onLocationChange}: MapProps) => {
    return (
        <Container>
            <LocationTabSection>
                <button
                    className={activeLocation === 'manhae' ? 'active' : ''}
                    onClick={() => onLocationChange('manhae')}
                >만해광장</button>
                <button
                    className={activeLocation === 'paljeongdo' ? 'active' : ''}
                    onClick={() => onLocationChange('paljeongdo')}
                >팔정도</button>
            </LocationTabSection>
            <MapWrapper>
                <MapImg
                    src={activeLocation === 'manhae' ? ManhaeGround : PalJeongDo}
                    alt={activeLocation === 'manhae' ? "만해광장 지도" : "팔정도 지도"}
                />

                {/* test Dot */}
                {activeLocation === 'manhae' ? (
                    <TempDot $x={30} $y={40} />
                ) : (
                    <TempDot $x={60} $y={70} />
                )}
            </MapWrapper>
        </Container>
    );
};

export default Map;