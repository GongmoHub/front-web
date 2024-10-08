'use client';

import React, { useState } from 'react';
import axios from 'axios';
import './register.scss';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    content: '',
    record: '',
    openTalkURL: '',
    imageURL: null as File | null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] =
    useState('/profile.png'); // 기본 이미지 설정

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // 미리보기 이미지 설정
      setFormData((prevData) => ({
        ...prevData,
        imageURL: file || null,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.imageURL) {
      setErrorMessage('이미지를 반드시 선택해야 합니다.');
      return;
    }

    const data = new FormData();
    data.append('id', formData.id);
    data.append('password', formData.password);
    data.append('name', formData.name);
    data.append('content', formData.content);
    data.append('record', formData.record);
    data.append('openTalkURL', formData.openTalkURL);

    if (formData.imageURL) {
      data.append('imageURL', formData.imageURL);
    }

    try {
      const response = await axios.post(
        'https://your-server-endpoint.com/api/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('등록 성공');
        setErrorMessage('');
      } else {
        console.error('등록 실패');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return (
    <div>
      <div className="register_box">
        {/* 이미지 선택 및 미리보기 */}
        <div className="custom-file-upload">
          <label htmlFor="file-upload">
            <img
              src={profileImage} // 기본 이미지 또는 선택된 이미지 미리보기
              alt="프로필 이미지"
              className="profile_image"
            />
          </label>
          <input
            id="file-upload"
            className="image_box"
            type="file"
            name="imageURL"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }} // 숨긴 파일 선택 input
          />
        </div>
        <input
          className="input_box"
          type="text"
          name="id"
          placeholder="아이디"
          value={formData.id}
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
        <input
          className="input_box"
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className="text_box"
          name="content"
          placeholder="주요 활동 내용"
          value={formData.content}
          onChange={handleChange}
        />
        <textarea
          className="text_box"
          name="record"
          placeholder="기록"
          value={formData.record}
          onChange={handleChange}
        />
        <input
          className="input_box"
          type="text"
          name="openTalkURL"
          placeholder="연락처 및 오픈톡 URL"
          value={formData.openTalkURL}
          onChange={handleChange}
        />

        {errorMessage && (
          <p className="error_message">{errorMessage}</p>
        )}
        <div className="button_box">
          <button
            className="register_button"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
