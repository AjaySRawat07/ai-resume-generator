import { useAppStore } from '@/zustand';
import React from 'react'
import Image from 'next/image'
import HexContainer from './HexContainer';

const ResumeHead = () => {
    const resumeState = useAppStore((state) => state.resumeState);
    const { photoUrl, firstName, lastName, jobTitle,city,country, phone, email, colorHex  } = resumeState
    return (
        <HexContainer>
            <div className='flex w-full relative justify-between py-3 min-28'>
                <div className='flex flex-col gap-1 justify-center'>
                    <h1 style={{color:colorHex}} className='font-bold text-1xl'>{firstName} {lastName}</h1>
                    <h3 style={{color:colorHex}} className='text-sm'>{jobTitle}</h3>
                    <p className='text-gray-500 text-xs'>{city} {country} &bull; {phone} &bull; {email}</p>
                </div>

                {photoUrl ?
                    <Image
                        src={photoUrl || "/userImage.png"}
                        alt="Picture of the author"
                        width={80}
                        height={80}
                        className='rounded-full h-16 w-16 object-cover'
                    />
                :null}
            </div>
        </HexContainer>
    )
}

export default ResumeHead
