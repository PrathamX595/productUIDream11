import React from 'react';
import Image from 'next/image';
import { CountertopsOutlined } from '@mui/icons-material';

interface LoadingBarProps {
  count: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ count }) => {
  const parallelogramCountGreen = count;
  const parallelogramCount = 11 - count;

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.1rem',
        backgroundColor: '#0D0402',
        justifyContent: 'center',
      }}
    >
      {Array.from({ length: parallelogramCountGreen }).map((_, index) => (
        <img
          key={index}
          src="/loadinggreen.svg"
          alt="loading bar green"
          className="w-[9%] h-auto max-w-[5rem]"
        />
      ))}
      {Array.from({ length: parallelogramCount }).map((_, index) => (
        <img
          key={index}
          src="/loadingwhite.svg"
          alt="loading bar"
          className="w-[9%] h-auto max-w-[5rem]"
        />
      ))}
    </div>
  );
};

export default LoadingBar;
