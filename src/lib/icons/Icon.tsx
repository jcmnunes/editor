import React from 'react';
import { ICONS, IconType } from './icons';

interface Props {
  icon: IconType;
  size?: number;
}

export const Icon: React.FC<Props> = ({ icon, size = 24 }) => {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d={ICONS[icon]} fill="currentColor" />
    </svg>
  );
};
