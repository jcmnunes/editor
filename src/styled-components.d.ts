import type { CSSProp } from 'styled-components';
import { theme } from '@binarycapsule/ui-capsules';

export type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

declare module 'react' {
  interface DOMAttributes {
    css?: CSSProp;
  }
}
