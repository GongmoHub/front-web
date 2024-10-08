'use client'; // 클라이언트 컴포넌트임을 명시

import React from 'react';
import { useRouter } from 'next/navigation';
import './navbar.scss';
const Navbar: React.FC = () => {
  const router = useRouter(); // 새로운 useRouter 사용

  // 페이지 이동 함수 정의
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <div className="navbar">
      <div className="navbar_top">
        <div>
          <p
            className="title"
            onClick={() => handleNavigation('/')}
          >
            공모허브
          </p>
        </div>
        <div className="content">
          <p
            onClick={() =>
              handleNavigation('/mento/choose')
            }
          >
            피드백 요청
          </p>
          <p onClick={() => handleNavigation('/recruit')}>
            팀원 모집
          </p>
          <p
            onClick={() =>
              handleNavigation('/mento/register')
            }
          >
            멘토 등록
          </p>
          <p
            onClick={() =>
              handleNavigation('/mento/delete')
            }
          >
            멘토 삭제
          </p>
        </div>
      </div>
      <div className="navbar_bottom"></div>
    </div>
  );
};

export default Navbar;
