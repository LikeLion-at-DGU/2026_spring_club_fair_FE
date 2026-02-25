import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { mockBooths } from '@/mocks/mockBooths';
import Header from '@/components/Entity/Header';
import carrot from '@/assets/icons/fi-sr-carrot.svg';
import dateIcon from '@assets/icons/cardTimeIcon.svg';
import placeIcon from '@assets/icons/cardPlaceIcon.svg';
import * as S from './BoothDetail.styled';
const BoothDetail = () => {
  const { id } = useParams<{ id: string }>();
  const booth = mockBooths.find((b) => b.id === Number(id));
  if (!booth) return <div>부스 정보를 찾을 수 없습니다.</div>;
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';

    const [, month, day] = dateStr.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // 화면 너비로 나누어 현재 보고 있는 배열의 인덱스(0, 1, 2...)를 구합니다.
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(newIndex);
    }
  };
  const currentOrder = booth.images[currentIndex]?.order ?? 0;
  return (
    <>
      <Header title='부스 상세 정보' />
      <S.Wrapper>
        <S.ImageWrapper>
          <S.BoothTag>
            <img src={carrot} alt='당근 아이콘' />
            {booth.name}
          </S.BoothTag>

          <S.BoothImgCount>
            {booth.images.length > 0
              ? `${currentOrder + 1}/${booth.images.length}`
              : '0/0'}
          </S.BoothImgCount>

          <S.ImageScrollContainer ref={scrollRef} onScroll={handleScroll}>
            {booth.images.map((image) => (
              <S.BoothImg
                key={image.order}
                src={image.image_url}
                alt={`${booth.name} 사진 ${image.order}`}
              />
            ))}
          </S.ImageScrollContainer>
          <S.Gradient />
        </S.ImageWrapper>

        <S.BoothInfoCardWrapper>
          <S.InfoCard>
            <S.CardTitleText>{booth.name}</S.CardTitleText>
            <S.InfoCardContent>
              <S.CardSubTitleText>EVENT</S.CardSubTitleText>
              {booth.event.map((event, index) => (
                <S.CardBodyText key={index}>• {event}</S.CardBodyText>
              ))}
            </S.InfoCardContent>

            <S.InfoCardContent>
              <S.CardSubTitleText>HERE</S.CardSubTitleText>
              <S.CardBodyText>
                <img src={dateIcon} alt='시간 아이콘' />
                {booth.dates.map((date, index) => (
                  <div key={index}>{formatDate(date)}</div>
                ))}
              </S.CardBodyText>
              <S.CardBodyText>
                <img src={placeIcon} alt='위치 아이콘' />
                {booth.location}
              </S.CardBodyText>
            </S.InfoCardContent>
          </S.InfoCard>

          <S.InfoCard>
            <S.CardTitleText>{booth.name}을 소개합니다</S.CardTitleText>
            <S.InfoCardContent>
              <S.CardBodyText className='black'>
                {booth.shortdesc}
              </S.CardBodyText>
              <S.CardBodyText className='grey800'>
                {booth.description}
              </S.CardBodyText>
            </S.InfoCardContent>
          </S.InfoCard>

          <S.InfoCard>
            <S.CardTitleText>{booth.name}과 함께 해주세요!</S.CardTitleText>
            <S.CardRecruitContents>
              <S.CardRecruitGap>
                <S.CardBodyText className='grey500'>모집기간</S.CardBodyText>
                <S.CardBodyText>
                  {formatDate(booth.recruitStart)} ~{' '}
                  {formatDate(booth.recruitEnd)}
                </S.CardBodyText>
              </S.CardRecruitGap>

              <S.CardRecruitGap>
                <S.CardBodyText className='grey500'>신청 방법</S.CardBodyText>
                {/* api연결시에는 recruit_detail임 */}
                <S.CardBodyText>{booth.recruitDetail}</S.CardBodyText>
              </S.CardRecruitGap>

              <S.CardRecruitGap>
                <S.CardBodyText className='grey500'>인스타그램</S.CardBodyText>
                {/* 여기도 접근자좀 달라질 수 있음 */}
                <S.CardBodyText
                  as='a'
                  href={`${booth.url}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  @{booth.handle}
                </S.CardBodyText>
              </S.CardRecruitGap>
            </S.CardRecruitContents>
          </S.InfoCard>
        </S.BoothInfoCardWrapper>
      </S.Wrapper>
    </>
  );
};

export default BoothDetail;
