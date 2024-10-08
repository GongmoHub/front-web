'use client';

import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { usePathname } from 'next/navigation'; // Next.js 13 이상에서 사용
import { Button } from 'antd';

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
  rule:string,
  contest: Contest | null;
};

export default function Page() {
  const [recruit, setRecruit] = useState<Board | null>(null); // API에서 받은 데이터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태

  const pathname = usePathname(); // 현재 경로에서 id를 가져옴
  const id = pathname.split('/').pop(); // URL에서 마지막 부분(id) 추출

  useEffect(() => {
    if (!id) return; // id가 없으면 아무것도 하지 않음

    const fetchRecruits = async () => {
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/board/${id}`)
      try {
        // 서버에서 팀원 모집 공고 데이터 가져오기
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/board/${id}`);
        setRecruit(response.data); // 데이터 저장
        setLoading(false); // 로딩 완료
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/board/${id}`)
        console.log(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        setLoading(false); // 에러가 발생해도 로딩 종료
      }
    };

    fetchRecruits();
  }, [id]); // id가 변경될 때마다 다시 실행

  if (loading) {
    return <p>Loading...</p>; // 데이터가 로딩 중일 때 로딩 메시지 표시
  }

  if (!recruit) {
    return <p>데이터를 불러오지 못했습니다.</p>; // 데이터가 없을 때 처리
  }

  const handleClick = () => {
    router.push(`/recruit`);
}

  return (
    <div>
      <h1>{recruit.title}</h1>

      <div className='post-meta'>
        <span>작성 날짜: {recruit.postDate}</span>
      </div>

      <div className='post-detail'>
        <img
          className='post-image'
          src={recruit.contest?.imageURL}
          alt="공모전 포스터 이미지"
        />
        <section className='detail-info'>
        <div className='detail-info-item'>
            <span className='detail-info-title'>모집 마감일</span>
            <span className='detail-info-content'>{recruit.closeDate}</span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>모집인원</span>
            <span className='detail-info-content'>{recruit.contactNum}명</span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>진행 방식</span>
            <span className='detail-info-content'>{recruit.rule}</span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>모집 분야</span>
            <span className='detail-info-content'>{recruit.recruitmentType}</span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>프로젝트 시작일</span>
            <span className='detail-info-content'>{recruit.startDate}</span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>연락 방법</span>
            <span className='detail-info-content'>{recruit.contactType}</span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>필요 기술 스택</span>
          </div>
          <span className='detail-info-content'>{recruit.techStack.join(', ')}</span>
        </section>
      </div>

      <div className='post-content'>
        <p>{recruit.content}</p>
      </div>
    </div>
  );
}
