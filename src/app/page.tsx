'use client';

import './main.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Competition {
  contestId: number;
  title: string;
  content: string;
  contestURL: string;
  startDate: string;
  endDate: string;
  imageURL: string;
}

const Mainpage: React.FC = () => {
  const [competitions, setCompetitions] = useState<
    Competition[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordinary, setOrdinary] = useState(''); // textarea의 값을 저장하는 상태 추가
  const competitionsPerPage = 6; // 한 페이지에 6개의 공모전
  const router = useRouter();

  useEffect(() => {
    // 서버에서 공모전 데이터 가져오기
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          'http://172.20.10.9/contest'
        );
        const data: Competition[] = response.data; // 서버로부터 받아온 데이터를 Competition 배열로 변환
        setCompetitions(data);
      } catch (error) {
        console.error(
          '공모전 데이터를 가져오는 중 오류 발생:',
          error
        );
      }
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

  const resultContest = () => {
    // 쿼리 파라미터를 문자열로 직접 추가하여 전달
    router.push(
      `/result?ordinary=${encodeURIComponent(ordinary)}`
    );
  };

  return (
    <div>
      <div className="main_box_top">
        <div className="information_box"></div>
        <div className="project_box">
          {/* textarea 값 변경 핸들러 */}
          <textarea
            className="input_box"
            value={ordinary}
            onChange={(e) => setOrdinary(e.target.value)} // textarea 값 상태로 관리
            placeholder="내용을 입력하세요"
          ></textarea>
          <div className="button_box">
            <button
              className="button"
              onClick={() => resultContest()}
            >
              공모전 검색
            </button>
          </div>
        </div>
      </div>
      <div className="main_box_middle"></div>
      <div className="main_bottom">
        <div className="main_box_bottom">
          {currentCompetitions.map((competition, index) => (
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

export default Mainpage;
