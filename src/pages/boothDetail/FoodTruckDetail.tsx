import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import Header from '@/components/Entity/Header';
import carrot from '@/assets/icons/fi-sr-carrot.svg';
import defaultImg from '@assets/images/boothDefaultImg.png';
import * as S from './BoothDetail.styled';
import { useFoodTruckDetail } from '@/hooks/useFoodTruckDetail';
const FoodTruckDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: booth, isLoading, error } = useFoodTruckDetail(id);

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

  if (isLoading) return <div>로딩중...</div>;
  if (!booth) return <div>푸드트럭 정보를 찾을 수 없습니다.</div>;
  const boothData = booth;

  const images =
    Array.isArray(boothData.images) && boothData.images.length > 0
      ? boothData.images
      : [];
  const currentOrder = images?.[currentIndex]?.order ?? 0;

  return (
    <>
      <Header title='푸드트럭 상세 정보' />
      <S.Wrapper>
        <S.ImageWrapper>
          {boothData.name && (
            <S.BoothTag>
              <img src={carrot} alt='당근 아이콘' />
              {boothData.name}
            </S.BoothTag>
          )}
          {images.length > 1 && (
            <S.BoothImgCount>
              {`${currentOrder + 1}/${images.length}`}
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
            {images.length > 0 ? (
              images.map((image) => (
                <S.BoothImg
                  key={image.order}
                  src={image.image_url ? image.image_url : defaultImg}
                  alt={`${boothData.name} 사진 ${image.order}`}
                  draggable={false}
                />
              ))
            ) : (
              <S.BoothImg
                src={defaultImg}
                alt={
                  boothData.name
                    ? `${boothData.name} 디폴트 이미지`
                    : '디폴트 이미지'
                }
                draggable={false}
              />
            )}

            <S.Gradient />
          </S.ImageScrollContainer>
        </S.ImageWrapper>
        <S.BoothInfoCardWrapper>
          <S.InfoCard>
            <S.CardTitleText>{boothData.name}</S.CardTitleText>
            <S.CardSubTitleText>menu</S.CardSubTitleText>
            <S.InfoCardContent>
              {Array.isArray(boothData.menu) && boothData.menu.length > 0 ? (
                boothData.menu.map((item, idx) => (
                  <S.CardBodyText key={idx}>
                    • {item.name} {item.price ? `${item.price}원` : ''}
                  </S.CardBodyText>
                ))
              ) : (
                <S.CardBodyText>메뉴 정보가 없습니다.</S.CardBodyText>
              )}
            </S.InfoCardContent>
          </S.InfoCard>
        </S.BoothInfoCardWrapper>
      </S.Wrapper>
    </>
  );
};

export default FoodTruckDetail;
