import { Link2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import HexContainer from './HexContainer'
import Headlines from './Headlines'
import { useAppStore } from '@/zustand'

type ProjectType={
  projectName: string,
  projectLink: string,
  content:string,
  skillsUsed: string[]
}

const ProjectSection = () => {
  const projects = useAppStore((state) => state.projects);
  
  return (
    <HexContainer>
      <div className='flex w-full flex-col relative justify-between py-3 min-h-28'>
        <Headlines title="Projects"/>
        <div className='flex flex-col gap-1'>
          {projects.map((project,index)=>{
            return <ProjectCard key={index} project={project}/>
          })}
        </div>
      </div>
    </HexContainer>
  )
}

export default ProjectSection

type ProjectCardType={
    project:ProjectType,
}

const ProjectCard= ({ project } :ProjectCardType) =>{
  const {projectName, projectLink, skillsUsed, content}=project
  
  return (
    <div className=' py-2'>
      <div className='flex justify-between pb-1'>
        <h2 className='text-black text-xs font-bold'>{projectName} &nbsp; &nbsp;
            {skillsUsed.map((skill:string, index:number)=>{
                return (
                    <span className='text-black font-normal' key={`skill_${index}`}> &bull; {skill}</span>
                )
            })}
        </h2>
        <p className='text-xs font-bold'>
            <Link target='__blank' href={projectLink} className='cursor-pointer'>
                <Link2 className={'text-sm text-blue-600'} size={12}/>
            </Link>
        </p>
      </div>
      <div className='flex flex-col'>
        <p className='text-black text-xs whitespace-pre-line'> {content} </p>
      </div>
    </div>
  )
}