import React from 'react'
import Headlines from './Headlines'
import { useAppStore } from '@/zustand'
import { EducationType } from '@/lib/schemaValidations'

const EducationSection = () => {
  const educations = useAppStore((state) => state.education);

  return (
    <div className='flex w-full flex-col relative justify-between py-3 min-h-28'>
      <Headlines title="Education"/>
      <div className='flex flex-col gap-1'>
        {educations.map((education,index)=>{
          return <ExperienceCard key={index} education={education}/>
        })}
      </div>
    </div>
  )
}

export default EducationSection

type EducationCardType={
  education:EducationType,
}

const ExperienceCard= ({ education } :EducationCardType) =>{
  const {achievement, field,school, graduation, location}=education
  return (
    <div className=' py-2'>
      <div className='flex justify-between pb-1'>
        <h2 className='text-black text-xs font-bold'>{field}</h2>
        <p className='text-black text-xs font-bold'>{graduation} / {location}</p>
      </div>
      <div className='flex flex-col'>
        <h2 className='text-black text-xs mb-1'>{school}</h2>
        <p className='text-black text-xs'>- {achievement} </p>
      </div>
    </div>
  )
}