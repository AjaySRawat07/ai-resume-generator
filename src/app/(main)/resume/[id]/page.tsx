import React from "react";
import { getUserResume } from "../../../../../actions/resume";
import Resume_Generator from "./_components/ResumeGenerator/resume_generator";
import Resume_template from "./_components/Resume_template/resume_template";

type ResumePageParamType = {
  id: string;
};

type ResumePageProps = {
  params: Promise<ResumePageParamType>;
};

const ResumePage = async ({ params }: ResumePageProps) => {
  const resolved = await params;
  const WholeResumeData = await getUserResume(resolved.id);

  return (
      <div className="flex flex-col md:flex-row w-full h-screen md:h-[90vh]">
        <Resume_Generator />
        <Resume_template WholeResumeData={WholeResumeData} />
      </div>
  );
};

export default ResumePage;
