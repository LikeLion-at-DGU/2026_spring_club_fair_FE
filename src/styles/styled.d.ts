import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Green
      green50: string;
      green100: string;
      green200: string;
      green300: string;
      green400: string;
      green500: string;
      green600: string;
      green700: string;
      green800: string;
      green900: string;

      // Grey
      grey50: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;
      grey900: string;

      // 공통
      primary: string;
      background: string;
      white: string;
      black: string;
    };
  }
}