"use client";

import { useAppStore } from '@/zustand';
import React from 'react'

type HeadlineType={
    title:string
}
const Headlines = ({title}:HeadlineType) => {
    const resumeState = useAppStore((state) => state.resumeState);
    const { colorHex } = resumeState
    return (
        <h1 style={{color:colorHex}} className='text-sm font-bold'>{title}</h1>
    )
}

export default Headlines
