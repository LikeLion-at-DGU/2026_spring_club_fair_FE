import React from "react";
import styled from "styled-components";
import ManhaeGround1 from "@assets/images/만해광장day1.png";
import ManhaeGround2 from "@assets/images/만해광장day2.png";
import PalJeongDo from "@assets/images/팔정도.png";
import { MANHAE_COORDS } from '@/constants/mapCoords';
import { PALJEONGDO_COORDS } from '@/constants/mapCoords';
import BoothMarker from "./Marker";
import type { Booth } from "@/types/booth";


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


// ----- ui ----- //

interface MapProps {
    activeLocation: 'manhae' | 'paljeongdo';
    onLocationChange: (loc: 'manhae' | 'paljeongdo') => void;
    activeDay: number;
    activeBooths: {
        id: number;
        locNum: number;
        type: string;
        division?: string | null;
    }[];
    selectedBoothId: number | null;
    activeDivision: string | null;
}

const Map = ({
    activeLocation,
    onLocationChange,
    activeDay,
    activeBooths,
    selectedBoothId,
    activeDivision,
}: MapProps) => {

    const currentCoords = activeLocation === 'manhae' ? MANHAE_COORDS : PALJEONGDO_COORDS;

    /**
     * 좌표 확인용(콘솔용) 함수
     * 
     * const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            // 클릭한 위치를 %로 계산
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            console.log(`{ x: ${x.toFixed(1)}, y: ${y.toFixed(1)} },`);
        };
     */


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
                    src={activeLocation === 'manhae' 
                        ? (activeDay === 1 ? ManhaeGround1 : ManhaeGround2)
                        : PalJeongDo}
                    alt={
                        activeLocation === 'manhae'
                        ? `만해광장 ${activeDay}일차 지도`
                        : "팔정도 지도"
                    }
                />
                {/* 테스트 : 전체 좌표 확인용*/}
                {Object.entries(currentCoords).map(([num, coord]) => (
                    <BoothMarker
                        key={num}
                        $x={coord.x}
                        $y={coord.y}
                        $type="CLUB"
                        $status="more"
                        onClick={() => alert(`부스번호 : ${num}`)}
                    />
                ))} 
                
                {/* 실제 부스 데이터 기반 마커 렌더링 */}
                {Array.isArray(activeBooths) && activeBooths.map((booth) => {
                    const coord = currentCoords[booth.locNum];

                    // 2일차 만해광장 미운영 부스 예외 처리
                    const isExcludedInManhaeDay2 =
                    activeLocation === 'manhae' &&
                    activeDay === 2 &&
                    (booth.locNum === 81 || booth.locNum === 82);

                    if (!coord || isExcludedInManhaeDay2) return null;

                    return (
                        <BoothMarker
                            key={booth.id}
                            $x={coord.x}
                            $y={coord.y}
                            $type={booth.type === 'FOODTRUCK' ? 'FOODTRUCK' : 'CLUB'}
                            $status={
                                selectedBoothId === booth.id ? 'activated' :
                                activeDivision === booth.division ? 'more' : 'default'
                            }
                        />                            
                    );
                })};
            </MapWrapper>
        </Container>
    );
};

export default Map;