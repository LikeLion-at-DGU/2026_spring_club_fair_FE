import * as S from './TimeTable.styled';
import { useState } from 'react';
import Header from '@/components/Entity/Header';
import DayTab from '@components/Entity/DayTab';
import TimeLineBox from './components/TimeLineBox';
import { mockDay1Timetable, mockDay2Timetable } from '@/mocks/mockTimeTable';
const TimeTable = () => {
  const [activeDay, setActiveDay] = useState(1);
  // 활성화된 타임 index
  const [activeIndex, setActiveIndex] = useState(0);

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

  // DayTab에서 선택된 날짜에 따라 mock 데이터 선택
  const timetableData = activeDay === 1 ? mockDay1Timetable : mockDay2Timetable;
  // location 1(만해광장) 또는 2(팔정도) 기준
  const timetableItems = timetableData.results[0]?.items || [];

  // 각 타임슬롯별 공연 찾기
  const getItemForTime = (time: string) =>
    timetableItems.find((item) => item.start_time === time);

  // 활성화된 공연 정보
  const activeTime = timeSlots[activeIndex];
  const activeItem = getItemForTime(activeTime);

  return (
    <>
      <Header title='타임테이블' />
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
            setActiveIndex(0); // 날짜 바뀌면 첫 타임으로 초기화
          }}
        />
        <S.TimeLineWrapper>
          {timeSlots.map((time, idx) => {
            const item = getItemForTime(time);
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
          })}
        </S.TimeLineWrapper>
        <S.TimeLineCaution>
          * 상세 공연 일정은 사정에 따라 변동될 수 있습니다.
        </S.TimeLineCaution>
      </S.Wrapper>
    </>
  );
};

export default TimeTable;
