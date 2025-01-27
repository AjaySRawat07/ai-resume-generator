"use client";

import React from "react";
import { StaticImageData } from 'next/image';
import { useRouter } from "next/navigation";
import Image from "next/image";

type Resume = {
  id: string;
  title: string;
};

type ResumeCardProps = {
  resume: Resume;
  imagePath: string | StaticImageData;
};

const Resume_card = ({ resume, imagePath }: ResumeCardProps) => {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/resume/${id}`);
  };

  return (
    <div
      className="flex flex-col items-center w-[200px] bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 mb-10 cursor-pointer relative overflow-hidden"
      onClick={() => handleNavigate(resume.id)}
    >
      <h2 className="text-sm font-semibold text-gray-800 my-2">
        {resume.title}
      </h2>
      <Image
        src={imagePath}
        alt={resume.title}
          className="w-[100%] object-cover"
      />
      {/* <Button
        className="text-white bg-gray-600 hover:bg-gray-900 rounded-md px-4 py-2"
        onClick={() => handleNavigate(resume.id)}
      >
        View Resume
        <Dock className="h-4 w-4 ml-2" />
      </Button> */}
    </div>
  );
};

export default Resume_card;
