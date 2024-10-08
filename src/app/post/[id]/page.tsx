import React from 'react'
import './style.scss'

export default function page() {



  return (
    <div>
      <h1>post 제목</h1>

      <div className='post-meta'>
        <span>작성 날짜</span>
      </div>

      <div className='post-detail'>
        <div>
          <img src="https://image.fmkorea.com/files/attach/new4/20241008/7552974476_486616_00dd2ec0c93ca43e30ff71ec7c7d39cd.jpg" alt="공모전 포스터 이미지" />
        </div>
        <div className='detail-info'>
          <span className='detail-info-title'>모집인원</span>
        </div>
      </div>

      <div className='post-content'>
        <p>글쓴 내용</p>
      </div>
    </div>
  )
}