import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import Header from '@/components/Entity/Header';
import carrot from '@/assets/icons/fi-sr-carrot.svg';
import dateIcon from '@assets/icons/cardTimeIcon.svg';
import placeIcon from '@assets/icons/cardPlaceIcon.svg';
import defaultImg from '@assets/images/boothDefaultImg.png';
import * as S from './BoothDetail.styled';
import { useClubBoothDetail } from '@/hooks/useClubBoothDetail';
import { useKoreanParticle } from '@/hooks/useKoreanParticle';
const BoothDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: booth, isLoading, error } = useClubBoothDetail(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    startScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollSnapType = 'none';
  };
  const onDragEnd = () => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.scrollSnapType = 'x mandatory';
  };
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = startScrollLeft.current - walk;
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(newIndex);
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const [, month, day] = dateStr.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
  };

  const boothName = booth?.name ?? '이름없음';
  const objectParticle = useKoreanParticle(boothName, 'object');
  const withParticle = useKoreanParticle(boothName, 'with');

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>부스 정보를 불러오지 못했습니다.</div>;
  if (!booth) return <div>부스 정보를 찾을 수 없습니다.</div>;

  const currentOrder = booth?.images?.[currentIndex]?.order ?? 0;

  return (
    <>
      <Header title='부스 상세 정보' />
      <S.Wrapper>
        <S.ImageWrapper>
          {booth.name && (
            <S.BoothTag>
              <img src={carrot} alt='당근 아이콘' />
              {booth.name}
            </S.BoothTag>
          )}
          {booth.images && booth.images.length > 1 && (
            <S.BoothImgCount>
              {`${currentOrder + 1}/${booth.images.length}`}
            </S.BoothImgCount>
          )}
          <S.ImageScrollContainer
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={onDragStart}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
            onMouseMove={onDragMove}
          >
            {booth.images && booth.images.length > 0
              ? booth.images.map((image) => (
                  <S.BoothImg
                    key={image.order}
                    src={image.image_url ? image.image_url : defaultImg}
                    alt={`${booth.name} 사진 ${image.order}`}
                    draggable={false}
                  />
                ))
              : booth.name && (
                  <S.BoothImg
                    src={defaultImg}
                    alt={`${booth.name} 디폴트 이미지`}
                    draggable={false}
                  />
                )}
          </S.ImageScrollContainer>
          <S.Gradient />
        </S.ImageWrapper>
        <S.BoothInfoCardWrapper>
          <S.InfoCard>
            <S.CardTitleText>{booth.name}</S.CardTitleText>
            <S.InfoCardContent>
              <S.CardSubTitleText>EVENT</S.CardSubTitleText>
              {booth.event?.map((event, index) => (
                <S.CardBodyText key={index}>• {event}</S.CardBodyText>
              ))}
            </S.InfoCardContent>
            <S.InfoCardContent>
              <S.CardSubTitleText>HERE</S.CardSubTitleText>
              <S.CardBodyText>
                <img src={dateIcon} alt='시간 아이콘' />
                {booth.dates?.map((date, index) => (
                  <div key={index}>{formatDate(date)}</div>
                ))}
              </S.CardBodyText>
              <S.CardBodyText>
                <img src={placeIcon} alt='위치 아이콘' />
                {booth.location_name}
              </S.CardBodyText>
            </S.InfoCardContent>
          </S.InfoCard>
          <S.InfoCard>
            <S.CardTitleText>
              {booth.name}
              {objectParticle} 소개합니다
            </S.CardTitleText>
            <S.InfoCardContent>
              <S.CardBodyText className='black'>
                {booth.short_description}
              </S.CardBodyText>
              <S.CardBodyText className='grey800'>
                {booth.description}
              </S.CardBodyText>
            </S.InfoCardContent>
          </S.InfoCard>
          <S.InfoCard>
            <S.CardTitleText>
              {booth.name}
              {withParticle} 함께 해주세요!
            </S.CardTitleText>
            <S.CardRecruitContents>
              <S.CardRecruitGap>
                <S.CardBodyText className='grey500'>모집기간</S.CardBodyText>
                <S.CardBodyText>
                  {!booth.recruit_start && !booth.recruit_end
                    ? '상시모집'
                    : `${formatDate(booth.recruit_start)} ~ ${formatDate(booth.recruit_end)}`}
                </S.CardBodyText>
              </S.CardRecruitGap>
              <S.CardRecruitGap>
                <S.CardBodyText className='grey500'>신청 방법</S.CardBodyText>
                <S.CardBodyText>{booth.recruit_detail}</S.CardBodyText>
              </S.CardRecruitGap>
              <S.CardRecruitGap>
                <S.CardBodyText className='grey500'>인스타그램</S.CardBodyText>
                {booth.instagram ? (
                  <S.CardBodyText
                    as='a'
                    href={booth.instagram.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {booth.instagram.handle}
                  </S.CardBodyText>
                ) : (
                  <S.CardBodyText>-</S.CardBodyText>
                )}
              </S.CardRecruitGap>
            </S.CardRecruitContents>
          </S.InfoCard>
        </S.BoothInfoCardWrapper>
      </S.Wrapper>
    </>
  );
};

export default BoothDetail;
