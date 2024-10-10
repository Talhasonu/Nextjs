import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4 border">
      <ThreeDots
        height="80"
        width="80"
        color="#4f46e5"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
