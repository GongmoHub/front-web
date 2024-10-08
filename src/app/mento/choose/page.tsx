'use client';

import React, { useState, useEffect } from 'react';
import './choose.scss';
import axios from 'axios';

interface Mentor {
  id: string | null; // id가 null일 수 있으므로
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
    const fetchMentors = async () => {
      // 서버에서 mentor 데이터 가져오기
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor`
        );
        setMentors(response.data);
      } catch (error) {
        console.error(
          '데이터를 불러오는 중 오류 발생:',
          error
        );
      }
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
      <div className="choose_boxs">
        <div className="mentors_grid">
          {currentMentors.map((mentor, index) => (
            <div
              key={mentor.id || index}
              className="mentor_card"
            >
              {' '}
              {/* id가 없으면 index를 사용 */}
              <img
                src={
                  mentor.imageUrl
                    ? mentor.imageUrl
                    : '/profile.png'
                } // src가 없으면 profile.png로 대체
                alt={mentor.name || '프로필 이미지'} // alt도 안전하게 대체
                className="mentor_image"
              />
              <div className="mentor_info">
                <h3>{mentor.name}</h3>
                <p>내용 : {mentor.content}</p>
                <p>기록 : {mentor.record}</p>
                <p>연락망 : {mentor.openTalkURL}</p>
              </div>
            </div>
          ))}
        </div>
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
