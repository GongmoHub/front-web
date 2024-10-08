'use client';

import './main.scss';
import { useEffect, useState } from 'react';

interface Competition {
  name: string;
  startDate: string;
  endDate: string;
  feature: string;
  description: string;
  imageUrl: string;
}

const Mainpage: React.FC = () => {
  const [competitions, setCompetitions] = useState<
    Competition[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const competitionsPerPage = 6; // 한 페이지에 6개의 공모전

  useEffect(() => {
    // 예시 데이터를 서버에서 받아오는 것처럼 설정
    const fetchCompetitions = () => {
      const data: Competition[] = [
        {
          name: '공모전 1',
          startDate: '2024-01-01',
          endDate: '2024-02-01',
          feature: '창의성',
          description: '공모전 1 설명',
          imageUrl: 'https://example.com/image1.jpg',
        },
        {
          name: '공모전 2',
          startDate: '2024-03-01',
          endDate: '2024-04-01',
          feature: '팀워크',
          description: '공모전 2 설명',
          imageUrl: 'https://example.com/image2.jpg',
        },
        {
          name: '공모전 3',
          startDate: '2024-05-01',
          endDate: '2024-06-01',
          feature: '기술력',
          description: '공모전 3 설명',
          imageUrl: 'https://example.com/image3.jpg',
        },
        {
          name: '공모전 4',
          startDate: '2024-07-01',
          endDate: '2024-08-01',
          feature: '문제 해결',
          description: '공모전 4 설명',
          imageUrl: 'https://example.com/image4.jpg',
        },
        {
          name: '공모전 5',
          startDate: '2024-09-01',
          endDate: '2024-10-01',
          feature: '지속 가능성',
          description: '공모전 5 설명',
          imageUrl: 'https://example.com/image5.jpg',
        },
        {
          name: '공모전 6',
          startDate: '2024-11-01',
          endDate: '2024-12-01',
          feature: '사회적 책임',
          description: '공모전 6 설명',
          imageUrl: 'https://example.com/image6.jpg',
        },
        {
          name: '공모전 7',
          startDate: '2025-01-01',
          endDate: '2025-02-01',
          feature: '혁신',
          description: '공모전 7 설명',
          imageUrl: 'https://example.com/image7.jpg',
        },
        {
          name: '공모전 8',
          startDate: '2025-03-01',
          endDate: '2025-04-01',
          feature: '글로벌',
          description: '공모전 8 설명',
          imageUrl: 'https://example.com/image8.jpg',
        },
      ];
      setCompetitions(data);
    };

    fetchCompetitions();
  }, []);

  // 현재 페이지에서 표시할 공모전 데이터
  const indexOfLastCompetition =
    currentPage * competitionsPerPage;
  const indexOfFirstCompetition =
    indexOfLastCompetition - competitionsPerPage;
  const currentCompetitions = competitions.slice(
    indexOfFirstCompetition,
    indexOfLastCompetition
  );

  // 페이지 변경 핸들러
  const paginate = (pageNumber: number) =>
    setCurrentPage(pageNumber);

  return (
    <div>
      <div className="main_box_top">
        <div className="information_box"></div>
        <div className="project_box">
          <textarea className="input_box"></textarea>
          <div className="button_box">
            <button className="button">피드백 요청</button>
            <button className="button">공모전 검색</button>
          </div>
        </div>
      </div>
      <div className="main_box_middle"></div>
      <div className="main_box_bottom">
        {currentCompetitions.map((competition, index) => (
          <div key={index} className="competition_card">
            <img
              src={competition.imageUrl}
              className="competition_image"
            />
            <div className="competition_info">
              <p>{competition.name}</p>
              <p>시작일: {competition.startDate}</p>
              <p>종료일: {competition.endDate}</p>
              <p>특징: {competition.feature}</p>
              <p>{competition.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[
          ...Array(
            Math.ceil(
              competitions.length / competitionsPerPage
            )
          ),
        ].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={
              currentPage === i + 1 ? 'active' : ''
            }
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Mainpage;
