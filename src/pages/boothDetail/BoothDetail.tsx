import { useParams } from 'react-router-dom';
import { mockBooths } from '@/mocks/mockBooths';
import Header from '@/components/Entity/Header';
import carrot from '@/assets/icons/fi-sr-carrot.svg';
import * as S from './BoothDetail.styled';
const BoothDetail = () => {
  const { id } = useParams<{ id: string }>();
  const booth = mockBooths.find((b) => b.id === Number(id));

  if (!booth) return <div>부스 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header title='부스 상세 정보' />
      <S.Wrapper>
        <S.ImageWrapper>
          <S.BoothTag>
            <img src={carrot} alt='당근 아이콘' />
            {booth.name}
          </S.BoothTag>
          <S.BoothImg src={booth.images} alt={`${booth.name} 사진`} />
          <S.Gradient />
        </S.ImageWrapper>

        <S.BoothInfoCardWrapper>
          <S.InfoCard>
            <div>{booth.description}</div>
          </S.InfoCard>
        </S.BoothInfoCardWrapper>
      </S.Wrapper>
    </>
  );
};

export default BoothDetail;
