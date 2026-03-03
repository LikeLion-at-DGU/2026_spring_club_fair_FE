import 'styled-components';
import type { RuleSet } from 'styled-components';

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
    fonts: {
      BR_B: Record<string, string>;
      BR_R: Record<string, string>;
      SB_28: Record<string, string>;
      SB_24: Record<string, string>;
      SB_20: Record<string, string>;
      SB_18: Record<string, string>;
      SB_16: Record<string, string>;
      SB_12: Record<string, string>;
      R_20: Record<string, string>;
      R_16: Record<string, string>;
      R_14: Record<string, string>;
      R_12: Record<string, string>;
      R_10: Record<string, string>;
    };
  }
}
