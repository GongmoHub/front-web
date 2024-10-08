'use client'

import React, { useState } from 'react'
import './style.scss'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import type { MenuProps } from 'antd';
import { Input, DatePicker, Select, Button, Space } from 'antd';

const { TextArea } = Input;

export default function page() {
  const [numberOfPeople, setNumberOfPeople] = useState("모집 인원")
  const [value, setValue] = useState('');


  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
          <Input placeholder="공모전을 검색해주세요" />
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                <DatePicker onChange={onChange} />
              </div>

            </li>
            <li className='list-item'>
              <label htmlFor="">프로젝트 시작일</label>
              <div>
                <DatePicker onChange={onChange} />
              </div>
            </li>
            <li className='list-item'>
              <label htmlFor="">프로젝트 마감일</label>
              <div>
                <DatePicker onChange={onChange} />
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
                  onChange={handleChange}
                  options={[
                    { value: '카카오톡', label: '카카오톡' },
                    { value: '이메일', label: '이메일' },
                    { value: '구글 폼', label: '구글 폼' },
                  ]}
                />
                <Input placeholder='관련 링크를 올려주세요.' />
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
                onChange={handleChange}
                options={[
                  {
                    label: 'China',
                    value: 'china',
                    emoji: '🇨🇳',
                    desc: 'China (中国)',
                  },
                  {
                    label: 'USA',
                    value: 'usa',
                    emoji: '🇺🇸',
                    desc: 'USA (美国)',
                  },
                  {
                    label: 'Japan',
                    value: 'japan',
                    emoji: '🇯🇵',
                    desc: 'Japan (日本)',
                  },
                  {
                    label: 'Korea',
                    value: 'korea',
                    emoji: '🇰🇷',
                    desc: 'Korea (韩国)',
                  },
                ]}
                optionRender={(option) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.emoji}
                    </span>
                    {option.data.desc}
                  </Space>
                )}
              />
            </li>
          </ul>
        </div>

      </section>
      {/* 3 */}
      <section >
        <div className='section_title'>
          <span className='order'>3</span>
          <h2>프로젝트에 대해 소개해주세요.</h2>
        </div>
        <div className='section_content'>
          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">제목</label>
              <Input placeholder="제목을 입력해주세요" />
            </li>
          </ul>
          <ul className='list-line'>
            <li className='list-item'>
              <label htmlFor="">팀원 소개 및 모집 이유</label>
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="팀원 소개 및 모집 이유, 목표 등을 입력해주세요."
                autoSize={{ minRows: 10, maxRows: 20 }}
              />
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}