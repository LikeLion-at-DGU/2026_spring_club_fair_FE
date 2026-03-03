import { useMemo } from 'react';

/**
 * 주어진 한글 문자열의 마지막 글자에 받침이 있는지 여부를 반환
 */
function hasFinalConsonant(word: string): boolean {
  if (!word) return false;
  // 마지막 글자가 특수문자(예: ) )면 그 앞 글자를 사용
  let lastChar = word[word.length - 1];
  if (/[^\w가-힣]/.test(lastChar) && word.length > 1) {
    lastChar = word[word.length - 2];
  }
  const code = lastChar.charCodeAt(0);
  // 한글 완성형 범위: 0xAC00 ~ 0xD7A3
  if (code < 0xac00 || code > 0xd7a3) return false;
  const jong = (code - 0xac00) % 28;
  return jong !== 0;
}

/**
 * 맞춤법에 따라 조사(을/를, 과/와)를 반환하는 훅
 */
export function useKoreanParticle(word: string, type: 'object' | 'with') {
  return useMemo(() => {
    const hasJong = hasFinalConsonant(word);
    if (type === 'object') {
      return hasJong ? '을' : '를';
    }
    if (type === 'with') {
      return hasJong ? '과' : '와';
    }
    return '';
  }, [word, type]);
}
