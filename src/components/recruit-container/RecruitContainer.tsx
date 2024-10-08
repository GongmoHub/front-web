import React from 'react'
import './RecruitContainer.scss'

type Props = {
    recruitTitle:string,
    recruitEndDate:string,
    stacks:string[]
    gongmoTitle:string
}

export default function RecruitContainer({}: Props) {
  return (
    <div className='container'>
        <img src="https://www.thinkcontest.com/thinkgood/common/display.do?filepath=contest_poster/image/&filename=bf7eb871c5d943ed9fbf4da8a27f4c63.png&defaultImage=/_custom/thinkgood/resource/image/sub/no_s_img.png" alt="포스터 이미지" />
        <div className='recruit-info'>
            <h2>공고 제목</h2>
            <span className='end-date'>마감일 | </span>
            <span>스택</span>
            <h3>#공모 이름</h3>
        </div>
    </div>
  )
}