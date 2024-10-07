'use client'

import React from 'react'
import './style.scss'
import type { DatePickerProps } from 'antd';
import { Input, DatePicker } from 'antd';

export default function page() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
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
            </li>
            <li className='list-item'>
              <label htmlFor="">진행 방식</label>
            </li>
          </ul>
          <ul className='list-line'>
            <li></li>
            {/* <DatePicker onChange={onChange} /> */}
          </ul>
        </div>

      </section>
      {/* 3 */}
      <section >
        <div className='section_title'>
          <span className='order'>3</span>
          <h2>프로젝트에 대해 소개해주세요.</h2>
        </div>
      </section>
    </div>
  )
}