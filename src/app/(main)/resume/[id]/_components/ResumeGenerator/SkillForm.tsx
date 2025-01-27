import { generateSummay } from '#/generators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/zustand';
import { AudioLines, X } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const SkillForm = () => {
    const updateSkillsData = useAppStore((state) => state.updateSkillsData);
    const skills = useAppStore((state) => state.skillsState);
    const [currentSkill, setCurrentSkill] =useState('')
    const [isLoading, setIsLoading] =useState(false)

    const handleAddSkill = () => {
        const newSkills=[...skills,currentSkill]
        updateSkillsData(newSkills)
        setCurrentSkill('')
    }

    const updateResumeData = useAppStore((state) => state.updateResumeData);
    const resumeState = useAppStore((state) => state.resumeState);
             
    const { summary } = resumeState
          
    const handleUpdateSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value= e.target.value
        updateResumeData({summary:value});
    }
    const removeSkill = (skill:string) => {
        const newSkills=skills.filter((el)=>el!==skill)
        updateSkillsData(newSkills)
    }

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        try {
          const output = await generateSummay(summary);
          updateResumeData({summary:output});
          toast.success('New summary Added!')
        } catch (err) {
          console.error("Error generating experience:", err);
        } finally {
            setIsLoading(false);
        }
      };
    
    return (
        <div className='px-10 py-5'>
            <div className='space-y-2 pt-4'>
                <label htmlFor='title' className='text-sm font-medium'>Skill</label>
                <div className='flex gap-2'>
                    <Input 
                        id="skill"
                        className='text-sm'
                        placeholder='Add SKills'
                        onChange={(e)=>setCurrentSkill(e.target.value)}
                        value={currentSkill}
                    />
                    <Button variant={'ghost'} className="text-xs px-4 py-2" onClick={handleAddSkill}>Add</Button>
                </div>
            </div>
            <div className='flex flex-wrap gap-2 py-2'>
                {skills.map((skill,index)=>{
                    return (
                        <div key={index} className='flex gap-2 rounded-lg bg-blue-600 text-white  p-1 px-2 text-xxs '>
                            <span >
                                {skill}
                            </span>
                            <span className='cursor-pointer' onClick={()=>removeSkill(skill)} >
                                <X  size={14} />
                            </span>
                        </div>
                    )
                })}
            </div>
            <div className='space-y-2 pt-4'>
                <label htmlFor='title' className='text-sm font-medium'>Summary</label>
                <Textarea 
                    rows={6}
                    id="title"
                    value={summary || ''}
                    onChange={handleUpdateSummary}
                    placeholder='Add a summary about your professional background'
                />
                <Button className='text-xs' onClick={handleGenerateSummary}> {isLoading?'Generating' :"Enhance With Ai"} <AudioLines size={12}/></Button>
           </div>
    </div>
  )
}

export default SkillForm
