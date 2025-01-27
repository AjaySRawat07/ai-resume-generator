import { format } from 'date-fns'
import React from 'react'
import HexContainer from './HexContainer';
import Headlines from './Headlines';
import { useAppStore } from '@/zustand';

const SkillSection = () => {
  const resumeState = useAppStore((state) => state.resumeState);
  const skills = useAppStore((state) => state.skillsState);
  const { colorHex } = resumeState
  
  return (
    <HexContainer>
      <div className='flex w-full flex-col relative justify-between py-3 min-h-28'>
        <Headlines title="Skills"/>
        <div className='flex flex-wrap gap-2 py-2'>
          {skills.map((skill,index)=>{
            return (
              <p key={index} style={{backgroundColor:colorHex}} className='text-white h-5 flex items-center px-2 text-xxs rounded-lg'>{skill}</p>
            )
          })}
        </div>
      </div>
    </HexContainer>
  )
}

export default SkillSection
