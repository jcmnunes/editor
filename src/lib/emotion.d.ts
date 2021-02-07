import '@emotion/react';
import { Theme as UICTheme } from '@binarycapsule/ui-capsules';

declare module '@emotion/react' {
  export interface Theme extends UICTheme {}
}
