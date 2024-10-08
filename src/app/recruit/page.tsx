'use client';

import React, { useEffect, useState } from 'react';
import './style.scss';
import RecruitContainer from '@/components/recruit-container/RecruitContainer';
import axios from 'axios';

type Contest = {
  contestId: number;
  title: string;
  content: string;
  contestURL: string;
  startDate: string;
  endDate: string;
  imageURL: string;
};

type Board = {
  boardId: number;
  title: string;
  content: string;
  techStack: string[];
  postDate: string;
  closeDate: string;
  openTalkURL: string;
  startDate: string;
  contactType: string;
  contactNum: number;
  recruitmentType: string;
  rule: string;
  contest: Contest | null;
};

export default function Page() {
  const [recruits, setRecruits] = useState<Board[]>([]); // 배열로 설정

  useEffect(() => {
    const fetchRecruits = async () => {
      // 서버에서 팀원 모집 공고 데이터 가져오기
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/board`
        );
        setRecruits(response.data); // 데이터가 배열이라고 가정
        console.log(response.data);
      } catch (error) {
        console.error(
          '데이터를 불러오는 중 오류 발생:',
          error
        );
      }
    };

    fetchRecruits();
  }, []);

  return (
    <div>
      <section>
        {/* RecruitContainer로 각각의 데이터를 출력 */}
        {recruits.map((recruit) => (
          <RecruitContainer
            key={recruit.boardId} // 고유한 key로 boardId 사용
            recruitId={recruit.boardId}
            recruitTitle={recruit.title}
            recruitEndDate={recruit.closeDate}
            stacks={recruit.techStack}
            gongmoTitle={
              recruit.contest
                ? recruit.contest.title
                : recruit.content
            } // 공모전 제목 또는 content
            imageUrl={
              recruit.contest?.imageURL ||
              recruit.openTalkURL
            } // 공모전 포스터 이미지 또는 대체 이미지
          />
        ))}
      </section>
    </div>
  );
}
