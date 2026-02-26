import * as S from './TimeTable.styled';
import { useState } from 'react';
import Header from '@/components/Entity/Header';
import DayTab from '@components/Entity/DayTab';
import TimeLineBox from './components/TimeLineBox';
import { useTimetable } from '@/hooks/useTimetable';
const TimeTable = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  // 날짜 문자열 매핑 (예시: 1=3/4, 2=3/5)
  const dayStrings = ['2026-03-04', '2026-03-05'];
  // location_id는 1(만해광장), 2(팔정도) 등으로 확장 가능. 여기선 1로 고정
  const locationId = 1;

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

  // API 연동
  const { booths, isLoading, error } = useTimetable({
    day: dayStrings[activeDay - 1],
    location_id: locationId,
  });
  console.log('API에서 받아온 부스 정보:', booths); // 받아온 데이터 확인용
  // API에서 start_time이 없으므로 loc_num 오름차순으로 정렬 후 타임슬롯에 순서대로 매핑 (임시)
  const sortedBooths = booths.slice().sort((a, b) => a.loc_num - b.loc_num);
  const getItemForTime = (idx: number) => sortedBooths[idx] || null;

  // 활성화된 공연 정보
  const activeItem = getItemForTime(activeIndex);

  return (
    <>
      <Header title='타임테이블' />
      <S.Wrapper>
        <S.TimeTableTop>
          <S.Title>지금 공연중인 동아리</S.Title>
          <S.TimeTableImgWrapper $img={activeItem?.logo_url || undefined}>
            <S.ImgTextWrapper>
              <S.ImgText className='category'>
                {activeItem?.division_name || '-'}
              </S.ImgText>
              <S.ImgText>{activeItem?.name || '-'}</S.ImgText>
            </S.ImgTextWrapper>
          </S.TimeTableImgWrapper>
        </S.TimeTableTop>

        <DayTab
          activeDay={activeDay}
          onTabClick={(id) => {
            setActiveDay(id);
            setActiveIndex(0); // 날짜 바뀌면 첫 타임으로 초기화
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
                  team={item?.name || ''}
                  category={item?.division_name || ''}
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
