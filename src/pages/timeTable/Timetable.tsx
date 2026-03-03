import * as S from './TimeTable.styled';
import { useState } from 'react';
import DayTab from '@components/Entity/DayTab';
import TimeLineBox from './components/TimeLineBox';
import { useTimetable } from '@/hooks/useTimetable';
import { useEffect } from 'react';
const TimeTable = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const dayStrings = ['2026-03-04', '2026-03-05'];
  // 13:00~18:00까지 30분 단위 타임라인 생성
  const timeSlots = [
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  useEffect(() => {
    const now = new Date();
    // 날짜 비교
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    // dayStrings에서 오늘 날짜가 있으면 activeDay로 설정
    const dayIdx = dayStrings.findIndex((d) => d === todayStr);
    if (dayIdx !== -1) {
      setActiveDay(dayIdx + 1);
      // 시간대 자동 활성화
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      // (예: 14:15 이면 14:00의 인덱스 반환)
      const slotIdx = [...timeSlots]
        .reverse()
        .findIndex((slot) => slot <= currentTime);

      if (slotIdx !== -1) {
        // reverse()를 했기 때문에 원래 인덱스로 복원
        setActiveIndex(timeSlots.length - 1 - slotIdx);
      } else {
        // 13:00 이전이거나 에러 상황이면 0(첫 타임)으로 설정
        setActiveIndex(0);
      }
    }
  }, []);
  // location_id는 1(만해광장), 2(팔정도) 등으로 확장 가능. 여기선 1로 고정
  const locationId = 1;

  // API 연동 (location_id는 useTimetable에서 사용하지 않으므로 제외)
  const { locations, isLoading, error } = useTimetable({
    day: dayStrings[activeDay - 1],
  });
  // locationId에 해당하는 timetable 데이터만 추출
  const locationData = locations.find((loc) => loc.location_id === locationId);
  const items = locationData?.items || [];
  // 타임슬롯이 공연의 start_time ~ end_time 범위에 포함되면 해당 공연을 보여줌
  const getItemForTime = (idx: number) => {
    const slot = timeSlots[idx]; // HH:MM
    // slot이 item.start_time <= slot < item.end_time 범위에 포함되는지 체크
    return (
      items.find((item) => {
        // HH:MM:SS → HH:MM으로 변환
        const start = item.start_time.slice(0, 5);
        const end = item.end_time.slice(0, 5);
        // 문자열 비교: slot >= start && slot < end
        return start <= slot && slot < end;
      }) || null
    );
  };

  // 활성화된 공연 정보
  const activeItem = getItemForTime(activeIndex);

  return (
    <>
      <S.Wrapper>
        <S.TimeTableTop>
          <S.Title>지금 공연중인 동아리</S.Title>
          <S.TimeTableImgWrapper $img={activeItem?.image_url || undefined}>
            <S.ImgTextWrapper>
              <S.ImgText className='category'>
                {activeItem?.category || '-'}
              </S.ImgText>
              <S.ImgText>{activeItem?.team_name || '-'}</S.ImgText>
            </S.ImgTextWrapper>
          </S.TimeTableImgWrapper>
        </S.TimeTableTop>

        <DayTab
          activeDay={activeDay}
          onTabClick={(id) => {
            setActiveDay(id);
            // 날짜 바뀌면 해당 날짜의 현재 시간에 맞는 타임슬롯으로 자동 이동
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            if (dayStrings[id - 1] === todayStr) {
              const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
              const slotIdx = [...timeSlots]
                .reverse()
                .findIndex((slot) => slot <= currentTime);

              if (slotIdx !== -1) {
                setActiveIndex(timeSlots.length - 1 - slotIdx);
              } else {
                setActiveIndex(0);
              }
            } else {
              setActiveIndex(0);
            }
          }}
        />
        <S.TimeLineWrapper>
          {isLoading ? (
            <div>로딩중...</div>
          ) : error ? (
            <div>에러가 발생했습니다.</div>
          ) : (
            timeSlots.map((time, idx) => {
              const item = getItemForTime(idx);
              const isActive = idx === activeIndex;
              return (
                <TimeLineBox
                  key={time}
                  time={time}
                  team={item?.team_name || ''}
                  category={item?.category || ''}
                  isActive={isActive}
                  onClick={() => setActiveIndex(idx)}
                />
              );
            })
          )}
        </S.TimeLineWrapper>
        <S.TimeLineCaution>
          * 상세 공연 일정은 사정에 따라 변동될 수 있습니다.
        </S.TimeLineCaution>
      </S.Wrapper>
    </>
  );
};

export default TimeTable;
