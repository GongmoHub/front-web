'use client'; // 클라이언트 컴포넌트임을 명시

import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter(); // 새로운 useRouter 사용

  // 페이지 이동 함수 정의
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <div className="nav_bar">
      <p>공모허브</p>
    </div>
  );
};

export default Navbar;
