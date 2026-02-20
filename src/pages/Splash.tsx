import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main', { replace: true }); // 뒤로가기로 스플래쉬화면 이동<< 막아둠
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    // (TODO : 스플래쉬 화면 터치해서 바로 넘어갈 수 있게 하려면 보완 필요)
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      안녕 (3초 뒤 이동)
    </div>
  );
};

export default Splash;