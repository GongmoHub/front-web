'use client'; // 클라이언트 컴포넌트임을 명시

import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    uid: '',
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
    const { uid, password } = formData;

    // 유효성 검사
    if (!uid || !password) {
      setErrorMessage('아이디와 비밀번호를 입력해 주세요.');
      return;
    }

    // 서버로 로그인 요청 보내기
    try {
      const response = await axios.post(
        'http://172.20.10.9/mentor/signin',
        {
          uid: uid,
          password: password,
        }
      );

      if (response.status === 200) {
        // 로그인 성공 처리
        setErrorMessage('');
        setSuccessMessage('로그인 성공!');
        // 예: 토큰을 로컬 스토리지에 저장하고 리다이렉트 처리
        localStorage.setItem('token', response.data.token);
        // 원하는 페이지로 이동
      } else {
        setErrorMessage(
          '로그인 실패: 잘못된 아이디 또는 비밀번호입니다.'
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
        <h2 className="login_title">로그인</h2>
        <input
          className="input_box"
          type="text"
          name="uid"
          placeholder="아이디"
          value={formData.uid}
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
            onClick={handleSubmit}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
