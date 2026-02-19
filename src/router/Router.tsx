import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from '@pages/Splash';
import Main from '@pages/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;