"use client";

import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { createResume } from "../../../../actions/resume";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Resume_card from "./resume_card";
import {
  img_1,
  img_2,
  img_3,
  img_4,
  img_5,
  img_6,
  img_7,
} from "@/../public/resume_demo/images";

const demoImages = [img_1, img_2, img_3, img_4, img_5, img_6, img_7];

const getRandomImage = (id: string) => {
  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  return demoImages[hash % demoImages.length];
};

type Resume = {
  id: string;
  title: string;
};

type DashBoardPageProps = {
  resumes: Resume[];
};

const DashboardPage = ({ resumes }: DashBoardPageProps) => {
  const {
    data: resumeData,
    error,
    fetchData: createFuncFunction,
    loading: updateDefaultLoading,
  } = useFetch(createResume);
  const router = useRouter();

  useEffect(() => {
    if (resumeData && !updateDefaultLoading) {
      if (resumeData.data?.id) {
        router.push(`/resume/${resumeData.data?.id}`);
      }
      toast.success("Resume Setup successful");
    }
  }, [resumeData, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : String(error);
      toast.error(errorMessage || "Failed to create resume");
    }
  }, [error]);

  return (
    <div className="h-screen overflow-y-scroll pb-40 flex flex-col pt-4">
      <Button
        disabled={updateDefaultLoading}
         className="mb-10 mx-auto"
        onClick={() => createFuncFunction()}
      >
        New Resume
        <Plus className="h-4 w-4" />
      </Button>
      <div className="flex flex-wrap ml-10 gap-6 w-full">
        {resumes.map((resume) => {
          const randomImage = getRandomImage(resume.id);
          return (
            <Resume_card key={resume.id} resume={resume} imagePath={randomImage} />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
