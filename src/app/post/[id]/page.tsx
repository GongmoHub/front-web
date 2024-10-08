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
          <img className='post-image' src="https://image.fmkorea.com/files/attach/new4/20241008/7552974476_486616_00dd2ec0c93ca43e30ff71ec7c7d39cd.jpg" alt="공모전 포스터 이미지" />
        <section className='detail-info'>
          <div className='detail-info-item'>
            <span className='detail-info-title'>모집인원</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>진행 방식</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>모집 분야</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>모집 마감일</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>프로젝트 시작일</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>프로젝트 마감일</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>연락 방법</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
          <div className='detail-info-item'>
            <span className='detail-info-title'>필요 기술 스택</span>
            <span className='detail-info-content'>
              2명
            </span>
          </div>
        </section>

      </div>

      <div className='post-content'>
        <p>글쓴 내용</p>
      </div>
    </div>
  )
}