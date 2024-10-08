import React, { useEffect } from 'react';
import './style.scss'
import RecruitContainer from '@/components/recruit-container/RecruitContainer';

export default function page() {

  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [])
  

  return <div>
    <section>
      <RecruitContainer/>
      <RecruitContainer/>
      <RecruitContainer/>
    </section>
    
  </div>;
}
