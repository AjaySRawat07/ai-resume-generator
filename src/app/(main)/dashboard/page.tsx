import React from 'react'
import DashboardPage from './DashboardPage'
import { getAllUserResumes } from '../../../../actions/resume'

export const dynamic = 'force-dynamic';

const page = async () => {
  const AllResumes= await getAllUserResumes()
  return <DashboardPage resumes={AllResumes}/>
}

export default page
