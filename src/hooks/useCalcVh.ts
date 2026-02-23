//100vh를 사용했을때 모바일에서 스크롤생기는것을 방지하는 훅

import { useEffect } from 'react';

const useVh = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);
};

export default useVh;
