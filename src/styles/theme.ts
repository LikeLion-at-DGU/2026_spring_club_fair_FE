import type { DefaultTheme } from 'styled-components';

const fontGenerator = (
  fontFamily = 'PyeojinGothic',
  fontSize = '1rem',
  fontWeight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
) => ({
  'font-family': fontFamily,
  'font-weight': fontWeight,
  'font-size': fontSize,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
});
export const theme: DefaultTheme = {
  colors: {
    // Green
    green50: '#f7f9e6',
    green100: '#e5ebb2',
    green200: '#d8e18d',
    green300: '#c7d359',
    green400: '#bccb39',
    green500: '#abbe07',
    green600: '#9cad06',
    green700: '#798705',
    green800: '#5e6904',
    green900: '#485003',

    // Grey
    grey50: '#f7f7f7',
    grey100: '#e6e6e6',
    grey200: '#d9dada',
    grey300: '#c8c9c9',
    grey400: '#bdbebf',
    grey500: '#adaeaf',
    grey600: '#9d9e9f',
    grey700: '#7b7c7c',
    grey800: '#5f6060',
    grey900: '#49494a',

    primary: '#abbe07', // green-500
    background: '#f5f5f5',
    white: '#FFFFFF',
    black: '#121212',
  },
  fonts: {
    BR_B: fontGenerator('BR-B', '64px', '400', 'auto', 'normal'),
    BR_R: fontGenerator('BR-R', '16px', '400', 'auto', 'normal'),
    SB_28: fontGenerator(
      'PyeojinGothic-Semibold',
      '28px',
      '600',
      'auto',
      'normal',
    ),
    SB_24: fontGenerator(
      'PyeojinGothic-Semibold',
      '24px',
      '600',
      'auto',
      'normal',
    ),
    SB_20: fontGenerator(
      'PyeojinGothic-Semibold',
      '20px',
      '600',
      'auto',
      'normal',
    ),
    SB_18: fontGenerator(
      'PyeojinGothic-Semibold',
      '18px',
      '600',
      'auto',
      'normal',
    ),
    SB_16: fontGenerator(
      'PyeojinGothic-Semibold',
      '16px',
      '600',
      'auto',
      'normal',
    ),
    R_20: fontGenerator(
      'PyeojinGothic-Regular',
      '20px',
      '400',
      'auto',
      'normal',
    ),
    R_16: fontGenerator(
      'PyeojinGothic-Regular',
      '16px',
      '400',
      'auto',
      'normal',
    ),
    R_14: fontGenerator(
      'PyeojinGothic-Regular',
      '14px',
      '400',
      'auto',
      'normal',
    ),
    R_12: fontGenerator(
      'PyeojinGothic-Regular',
      '12px',
      '400',
      'auto',
      'normal',
    ),
    R_10: fontGenerator(
      'PyeojinGothic-Regular',
      '10px',
      '400',
      'auto',
      'normal',
    ),
  },
};
