import axios from 'axios';

export const getBooths = async () => {
  try {
    const response = await axios.get('/api/booths');
    return response.data; 
  } catch (error) {
    console.error("부스 데이터를 가져오는 중 오류 발생:", error);
    return [];
  }
};