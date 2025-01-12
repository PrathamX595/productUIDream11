'use client';
import React from 'react';
import Image from 'next/image';

interface MatchProps {
  Team1: string;
  Team2: string;
  initial1: string;
  time: string;
  initial2: string;
}

const Match: React.FC<MatchProps> = ({
  Team1,
  Team2,
  initial1,
  initial2,
  time,
}) => {
  return (
    <div
      className="bg-white bg-opacity-20 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex w-full py-5 px-10 justify-center mt-2 overflow-x-auto shadow-inner shadow-white hover:cursor-pointer"
      onClick={() => {
        localStorage.clear();
        window.location.href = `/PlayerSelection/?match=${initial1} vs ${initial2}`;
      }}
    >
      <div className="flex items-center gap-10 w-[40%]">
        <Image
          src={`/teamlogos/${initial1}.svg`}
          width={'72'}
          height={'72'}
          alt="/"
          className="rounded-full h-20 w-20"
        />
        <div className="flex flex-col">
          <h3 className="text-white text-3xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
            {initial1}
          </h3>
          <p className="text-white text-md leading-[ 283.333%] tracking-[-0.6px]">
            {Team1}
          </p>
        </div>
      </div>
      <p className="text-[#787878] text-xl leading-[ 283.333%] tracking-[-0.6px]">
        {time}
      </p>
      <div className="flex items-center gap-10 w-[40%] flex-row-reverse">
        <Image
          src={`/teamlogos/${initial2}.svg`}
          width={'72'}
          height={'72'}
          alt="/"
          className="rounded-full h-20 w-20"
        />
        <div className="flex flex-col">
          <h3 className="text-white text-3xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
            {initial2}
          </h3>
          <p className="text-white text-md leading-[ 283.333%] tracking-[-0.6px]">
            {Team2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Match;
