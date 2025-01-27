import { Input } from '@/components/ui/input'
import { useAppStore } from '@/zustand';
import React from 'react'

const PersonalInfo = () => {
    const updateResumeData = useAppStore((state) => state.updateResumeData);
    const resumeState = useAppStore((state) => state.resumeState);
       
    const { firstName, lastName, email, photoUrl ,phone, jobTitle, city, country} = resumeState
    
    const handleUpdatePersonalInfo = (param:string, value:string) => {
        updateResumeData({[param]:value});
    }

  return (
    <div className='px-10 py-5 flex flex-col gap-4'>
        <div>
            <label htmlFor='photo' className='text-sm font-medium'>Your Photo Url</label>
            <div className='flex gap-2'>
                <Input 
                    id="title"
                    value={photoUrl || ''}
                    onChange={(e)=>handleUpdatePersonalInfo('photoUrl', e.target.value)}
                    placeholder='Eg: Provide a public Url for your picture'
                />
                {/* <Button variant={'ghost'} className="text-xs px-4 py-2">Remove</Button> */}
            </div>
        </div>
        <div className='flex gap-2 items-center'>
            <div className='w-full'>
                <label htmlFor='firstname' className='text-sm'>First Name</label>
                <Input 
                    id="firstname"
                    value={firstName || ''}
                    onChange={(e)=>handleUpdatePersonalInfo('firstName', e.target.value)}
                    placeholder='Eg: John'
                />
            </div>
            <div className='w-full'>
                <label htmlFor='lastname' className='text-sm'>Last Name</label>
                <Input 
                    id="lastname"
                    value={lastName || ''}
                    onChange={(e)=>handleUpdatePersonalInfo('lastName', e.target.value)}
                    placeholder='Eg: Wick'
                />
            </div>
        </div>
        <div className='space-y-2'>
            <label htmlFor='jobTitle' className='text-sm font-medium'>Job Title</label>
            <Input 
                id="jobTitle"
                value={jobTitle || ''}
                onChange={(e)=>handleUpdatePersonalInfo('jobTitle', e.target.value)}
                placeholder='Eg: Software Engineer'
            />
        </div>
        <div className='flex gap-2 items-center'>
            <div className='w-full'>
                <label htmlFor='firstname' className='text-sm'>City</label>
                <Input 
                    id="city"
                    value={city || ''}
                    onChange={(e)=>handleUpdatePersonalInfo('city', e.target.value)}
                    placeholder='Eg: Dehradun'
                />
            </div>
            <div className='w-full'>
                <label htmlFor='lastname' className='text-sm'>Country</label>
                <Input 
                    id="country"
                    value={country || ''}
                    onChange={(e)=>handleUpdatePersonalInfo('country', e.target.value)}
                    placeholder='Eg: Country'
                />
            </div>
        </div>
        <div className='space-y-2'>
            <label htmlFor='phone' className='text-sm font-medium'>Phone No</label>
            <Input 
                id="phone"
                value={phone || ''}
                onChange={(e)=>handleUpdatePersonalInfo('phone', e.target.value)}
                placeholder='Enter your phone number'
            />
        </div>
        <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium'>Email</label>
            <Input 
                id="email"
                value={email || ''}
                onChange={(e)=>handleUpdatePersonalInfo('email', e.target.value)}
                placeholder='Enter your email'
            />
        </div>
    </div>
  )
}

export default PersonalInfo
