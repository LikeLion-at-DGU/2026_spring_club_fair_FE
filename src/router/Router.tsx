import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 레이아웃 컴포넌트
import HeaderLayout from '@components/Layout/HeaderLayout';
import FullLayout from '@components/Layout/FullLayout';
// 페이지 컴포넌트
import Splash from '@/pages/Splash';
import Main from '@pages/Main';
import BoothMap from '@pages/BoothMap';
import Test from '@pages/Test';
import TestResult from '@pages/TestResult';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/main' element={<Main />} />
        {/* 전체 화면 레이아웃 */}
        <Route element={<FullLayout />}></Route>

        {/* 헤더 있는 화면 레이아웃 */}
        <Route element={<HeaderLayout />}>
          <Route path="/boothmap" element={<BoothMap />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test/result" element={<TestResult />} />
          <Route path='/boothmap' element={<BoothMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
