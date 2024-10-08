'use client';

import { useSearchParams } from 'next/navigation'; // useSearchParams 사용
import { useEffect, useState } from 'react';
import axios from 'axios';
import './result.scss';

interface Competition {
  contestId: number;
  title: string;
  content: string;
  contestURL: string;
  startDate: string;
  endDate: string;
  imageURL: string;
}

const ResultPage: React.FC = () => {
  const searchParams = useSearchParams(); // 쿼리 파라미터 읽기
  const [competitions, setCompetitions] = useState<
    Competition[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const competitionsPerPage = 10; // 한 페이지에 6개의 공모전
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

  useEffect(() => {
    const resultContest = async () => {
      try {
        const ordinary = searchParams.get('ordinary');
        console.log('ordinary:', ordinary);
        // 동적 경로로 요청 보내기
        const response = await axios.get(
          `http://172.16.1.240/contest/ordinary/${ordinary}`
        );

        if (response.status === 200) {
          console.log('response:', response.data);
          // 데이터를 로컬 스토리지에 저장하고 페이지 이동
          setCompetitions(response.data);
        }
      } catch (error) {
        console.error(
          '서버에 데이터 전송 중 오류 발생:',
          error
        );
      }
    };

    resultContest();
  }, [searchParams]);

  return (
    <div>
      <div className="result_box">
        <div className="result_box_bottom">
          {competitions.map((competition, index) => (
            <div key={index} className="competition_card">
              <img
                src={competition.imageURL}
                className="competition_image"
              />
              <div className="competition_info">
                <p>{competition.title}</p>
                <p>시작일: {competition.startDate}</p>
                <p>종료일: {competition.endDate}</p>
                <a
                  href={competition.contestURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {competition.contestURL.length > 20
                    ? `${competition.contestURL.slice(
                        0,
                        20
                      )}...`
                    : competition.contestURL}
                </a>
              </div>
            </div>
          ))}
        </div>
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

export default ResultPage;
