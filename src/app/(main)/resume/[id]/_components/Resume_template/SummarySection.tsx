"use client";
import { useAppStore } from '@/zustand';
import React from 'react'
import Headlines from './Headlines';
import HexContainer from './HexContainer';

const SummarySection = () => {
    const resumeState = useAppStore((state) => state.resumeState);
    const { summary } = resumeState

    return (
        <HexContainer>
            <div className='flex w-full flex-col relative justify-between py-3 min-h-28'>
                <Headlines title="Summary"/>
                <div className='flex flex-wrap gap-2 py-2'>
                    <p className='text-black text-xs rounded-lg'>{summary}</p>
                </div>
            </div>
        </HexContainer>
    )
}

export default SummarySection
