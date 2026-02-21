import styled from 'styled-components';
import Header from '../components/Entity/Header';
import SearchBar from '@/components/Entity/SearchBar';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.main`
  flex: 1;
  padding: 20px 6%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const BoothMap = () => {
  return (
    <PageContainer>
      {/* 헤더 */}
      <Header title="부스 지도" /> 

      {/* 본문 */}
      <PageContent>
        <SearchBar/>
        <div style={{border: "1px solid"}}>Map</div>
        <div style={{border: "1px solid"}}>BoothCard List</div>
      </PageContent>
    </PageContainer>
  );
};

export default BoothMap;