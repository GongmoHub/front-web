'use client';

import React, { useState, useEffect } from 'react';
import './choose.scss';

interface Mentor {
  id: string;
  name: string;
  content: string;
  record: string;
  openTalkURL: string;
  imageUrl: string;
}

const ChoosePage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const mentorsPerPage = 8; // 한 페이지에 표시할 mentor 수

  useEffect(() => {
    const fetchMentors = () => {
      const data: Mentor[] = [
        {
          id: '공모전 1',
          name: '이창의',
          content: '백엔드 개발자',
          record: '계명대학교 대장',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 2',
          name: '김지후',
          content: '프론트엔드 개발자',
          record: '계명대학교 후지',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 3',
          name: '한동근',
          content: '백엔드 개발자',
          record: '계명대학교 헬창',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 4',
          name: '이상현',
          content: '프론트엔드 개발자',
          record: '계명대학교 동네 형',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 5',
          name: '이종현',
          content: '백엔드 개발자',
          record: '계명대학교 키다리',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 6',
          name: '김보성',
          content: '프론트엔드 개발자',
          record: '계명대학교 대장님',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 7',
          name: '이민재',
          content: '백엔드 개발자',
          record: '계명대학교 축알못',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 8',
          name: '오민규',
          content: '백엔드 개발자',
          record: '계명대학교 랄로',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 9',
          name: '류세민',
          content: '프론트엔드 개발자',
          record: '계명대학교 병신',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
        {
          id: '공모전 10',
          name: '김민수',
          content: '백엔드 개발자',
          record: '계명대학교',
          openTalkURL: 'https://naver.com',
          imageUrl: './profile.png',
        },
      ];
      setMentors(data);
    };

    fetchMentors();
  }, []);

  // 현재 페이지에 표시할 mentor 목록
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor =
    indexOfLastMentor - mentorsPerPage;
  const currentMentors = mentors.slice(
    indexOfFirstMentor,
    indexOfLastMentor
  );

  // 페이지 수 계산
  const totalPages = Math.ceil(
    mentors.length / mentorsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mentors_grid">
        {currentMentors.map((mentor) => (
          <div key={mentor.id} className="mentor_card">
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="mentor_image"
            />
            <div className="mentor_info">
              <h3>{mentor.name}</h3>
              <p>{mentor.content}</p>
              <p>{mentor.record}</p>
              <a
                href={mentor.openTalkURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                오픈톡 바로가기
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* 페이지네이션 인디케이터 */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`pagination_button ${
              currentPage === i + 1 ? 'active' : ''
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoosePage;
