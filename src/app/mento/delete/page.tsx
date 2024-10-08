'use client'; // 클라이언트 컴포넌트임을 명시

import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';
import { useRouter } from 'next/navigation';

const DeletePage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = formData;

    // 유효성 검사
    if (!email || !password) {
      setErrorMessage('아이디와 비밀번호를 입력해 주세요.');
      return;
    }

    // 서버로 로그인 요청 보내기
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}?email=${email}&password=${password}`
      );

      if (response.status === 204) {
        // 로그인 성공 처리
        setErrorMessage('');
        setSuccessMessage('삭제 성공!');
        router.push('/');
      } else {
        setErrorMessage(
          '삭제 실패: 잘못된 아이디 또는 비밀번호입니다.'
        );
      }
    } catch (error) {
      setErrorMessage('서버 오류가 발생했습니다.');
      console.error('서버 오류:', error);
    }
  };

  return (
    <div>
      <div className="login_box">
        <h2 className="login_title">멘토 등록 삭제</h2>
        <input
          className="input_box"
          type="text"
          name="email"
          placeholder="아이디"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="input_box"
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        {errorMessage && (
          <p className="error_message">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="success_message">
            {successMessage}
          </p>
        )}
        <div className="button_box">
          <button
            className="login_button"
            onClick={() => handleSubmit()}
          >
            삭 제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
