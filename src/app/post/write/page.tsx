'use client'

import React, { useState } from 'react'
import './style.scss'
import { Input, DatePicker, Select, Button, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

export default function Page() {
  const [numberOfPeople, setNumberOfPeople] = useState("모집 인원");
  const [recruitReason, setRecruitReason] = useState('');
  const [competitionTitle, setCompetitionTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [closingDate, setClosingDate] = useState(null);
  const [communicationMethod, setCommunicationMethod] = useState("연락 방법");
  const [link, setLink] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]); // 필요 기술 스택 배열

  const onDateChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (date, dateString) => {
    setter(dateString); // DatePicker의 값을 문자열로 저장
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecruitReason(e.target.value);
  };

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    setter(value);
  };

  // 필요 기술 스택 다중 선택 처리
  const handleTechStackChange = (value: string[]) => {
    setSelectedTechStack(value); 
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        numberOfPeople,
        recruitReason,
        competitionTitle,
        startDate,
        endDate,
        closingDate,
        communicationMethod,
        link,
        selectedTechStack,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/board`, formData);

      if (response.status === 200) {
        message.success('글이 성공적으로 등록되었습니다!');
      }
    } catch (error) {
      console.error('글 등록 중 오류 발생:', error);
      message.error('글 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      {/* 1 */}
      <section>
        <div className='section_title'>
          <span className='order'>1</span>
          <h2>참가할 공모전을 검색해주세요.</h2>
        </div>
        <div className='section_content'>
          <Input
            placeholder="공모전을 검색해주세요"
            value={competitionTitle}
            onChange={handleInputChange(setCompetitionTitle)}
          />
        </div>
      </section>
      
      {/* 2 */}
      <section>
        <div className='section_title'>
          <span className='order'>2</span>
          <h2>프로젝트 기본 정보를 입력해주세요.</h2>
        </div>
        <div className='section_content'>
          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">모집 인원</label>
              <div>
                <Select
                  defaultValue="모집 인원"
                  style={{ width: 150 }}
                  onChange={handleSelectChange(setNumberOfPeople)}
                  options={[
                    { value: '1명', label: '1명' },
                    { value: '2명', label: '2명' },
                    { value: '3명', label: '3명' },
                    { value: '4명', label: '4명' },
                  ]}
                />
              </div>
            </li>

            <li className='list-item'>
              <label htmlFor="">진행 방식</label>
              <div>
                <Select
                  defaultValue="진행 방식"
                  style={{ width: 150 }}
                  onChange={handleSelectChange(setNumberOfPeople)} 
                  options={[
                    { value: '온라인', label: '온라인' },
                    { value: '오프라인', label: '오프라인' },
                    { value: '온/오프라인', label: '온/오프라인' },
                  ]}
                />
              </div>
            </li>

            <li className='list-item'>
              <label htmlFor="">모집 분야</label>
              <div>
                <Select
                  defaultValue="모집 분야"
                  style={{ width: 150 }}
                  onChange={handleSelectChange(setNumberOfPeople)} 
                  options={[
                    { value: '프론트', label: '프론트' },
                    { value: '백엔드', label: '백엔드' },
                    { value: '디자이너', label: '디자이너' },
                    { value: 'IOS', label: 'IOS' },
                    { value: '안드로이드', label: '안드로이드' },
                    { value: '데브옵스', label: '데브옵스' },
                    { value: 'PM', label: 'PM' },
                    { value: '기획자', label: '기획자' },
                    { value: '마케터', label: '마케터' },
                  ]}
                />
              </div>
            </li>
          </ul>

          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">모집 마감 일</label>
              <div>
                <DatePicker onChange={onDateChange(setClosingDate)} />
              </div>
            </li>
            <li className='list-item'>
              <label htmlFor="">프로젝트 시작일</label>
              <div>
                <DatePicker onChange={onDateChange(setStartDate)} />
              </div>
            </li>
            <li className='list-item'>
              <label htmlFor="">프로젝트 마감일</label>
              <div>
                <DatePicker onChange={onDateChange(setEndDate)} />
              </div>
            </li>
          </ul>

          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">연락 방법</label>
              <div className='flex_container'>
                <Select
                  defaultValue="연락 방법"
                  style={{ width: 150 }}
                  onChange={handleSelectChange(setCommunicationMethod)}
                  options={[
                    { value: '카카오톡', label: '카카오톡' },
                    { value: '이메일', label: '이메일' },
                    { value: '구글 폼', label: '구글 폼' },
                  ]}
                />
                <Input
                  placeholder='관련 링크를 올려주세요.'
                  value={link}
                  onChange={handleInputChange(setLink)}
                />
              </div>
            </li>
          </ul>

          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">필요 기술 스택</label>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="필요 기술 스택을 선택해주세요."
                onChange={handleTechStackChange} // 기술 스택 배열에 저장
                options={[
                  { label: 'React', value: 'React' },
                  { label: 'TypeScript', value: 'TypeScript' },
                  { label: 'Node.js', value: 'Node.js' },
                  { label: 'Express', value: 'Express' },
                  { label: 'Spring Boot', value: 'Spring Boot' },
                  { label: 'Docker', value: 'Docker' },
                  { label: 'k8s', value: 'k8s' },
                  { label: 'GraphQL', value: 'GraphQL' },
                  { label: 'Figma', value: 'Figma' },
                  { label: 'Adobe XD', value: 'Adobe XD' },
                  { label: 'Sass', value: 'Sass' },
                  { label: 'Jenkins', value: 'Jenkins' },
                  { label: 'Git', value: 'Git' },
                  { label: 'MySQL', value: 'MySQL' },
                  { label: 'PostgreSQL', value: 'PostgreSQL' },
                  { label: 'MongoDB', value: 'MongoDB' },
                  { label: 'Redis', value: 'Redis' },
                  { label: 'ElasticSearch', value: 'ElasticSearch' }
                ]}
              />
            </li>
          </ul>
        </div>
      </section>

      {/* 3 */}
      <section>
        <div className='section_title'>
          <span className='order'>3</span>
          <h2>프로젝트에 대해 소개해주세요.</h2>
        </div>
        <div className='section_content'>
          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">팀원 소개 및 모집 이유</label>
              <TextArea
                value={recruitReason}
                onChange={handleTextAreaChange}
                placeholder="팀원 소개 및 모집 이유, 목표 등을 입력해주세요."
                autoSize={{ minRows: 10, maxRows: 20 }}
              />
            </li>
          </ul>
        </div>
      </section>

      <div style={{ display: 'flex' }}>
        <Button style={{ marginLeft: 'auto' }} onClick={handleSubmit}>
          글 등록
        </Button>
      </div>
    </div>
  );
}
