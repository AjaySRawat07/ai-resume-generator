import { Input } from '@/components/ui/input'
import { useAppStore } from '@/zustand';
import React from 'react'

const ResumeInfoForm = () => {
   const updateResumeData = useAppStore((state) => state.updateResumeData);
   const resumeState = useAppStore((state) => state.resumeState);
   
   const {title} = resumeState

   const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle= e.target.value
    updateResumeData({title:newTitle});
  }

  return (
    <div className='px-10 py-5'>
        <div className='space-y-2'>
            <label htmlFor='title' className='text-sm font-medium'>Title</label>
            <Input 
                id="title"
                value={title}
                onChange={handleUpdateTitle}
                placeholder='Eg: Frontend Engineer Resume'
            />
        </div>
    </div>
  )
}

export default ResumeInfoForm
