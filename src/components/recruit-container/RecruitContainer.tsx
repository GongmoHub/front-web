'use client'; // 클라이언트 사이드에서만 실행

import React from 'react';
import './RecruitContainer.scss';
import { useRouter } from 'next/navigation'; // 최신 Next.js에서 next/navigation 사용

type Props = {
  recruitId: number;
  recruitTitle: string;
  recruitEndDate: string;
  stacks: string[];
  gongmoTitle: string;
  imageUrl: string;
};

export default function RecruitContainer({
  recruitId,
  recruitTitle,
  recruitEndDate,
  stacks,
  gongmoTitle,
  imageUrl,
}: Props) {
  const router = useRouter(); // useRouter 훅 사용

  const handleClick = () => {
    router.push(`/post/${recruitId}`);
  };

  return (
    <div className='container' onClick={handleClick}>
      <img
        src={imageUrl}
        alt="포스터 이미지"
        className="poster-image"
      />
      <div className='recruit-info'>
        {/* 공고 제목 출력 */}
        <h2>{recruitTitle}</h2>

        {/* 마감일 출력 */}
        <span className='end-date'>모집 마감일 | {recruitEndDate}</span>

        {/* 스택 리스트 출력 */}
        <div className='stacks'>
          {stacks.map((stack, index) => (
            <span key={index} className='stack'>
              {stack}
            </span>
          ))}
        </div>

        {/* 공모 이름 출력 */}
        <h4># {gongmoTitle}</h4>
      </div>
    </div>
  );
}
