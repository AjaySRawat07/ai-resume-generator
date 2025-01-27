"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import ResumeInfoForm from "./ResumeInfoForm";
import { Button } from "@/components/ui/button";
import PersonalInfo from "./PersonalInfo";
import SkillForm from "./SkillForm";
import MultiExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import MultiEducationForm from "./educationForm";

const Resume_Generator = () => {
  const [currentTab, setCurrentTab] = useState(GENERATOR_STEPS[0]);

  const FormGenerator = () => {
    switch (currentTab.key) {
      case "resumeInfo":
        return <ResumeInfoForm />;
      case "workExperience":
        return <MultiExperienceForm />;
      case "personalInfo":
        return <PersonalInfo />;
      case "skillsSummary":
        return <SkillForm />;
      case "project":
        return <ProjectForm />;
      case "education":
        return <MultiEducationForm />;
      default:
        return <div></div>;
    }
  };

  const CurrentTabIndex = useMemo(() => {
    return GENERATOR_STEPS.findIndex((el) => el.key === currentTab.key);
  }, [currentTab]);

  const handlePrevTab = () => {
    setCurrentTab(GENERATOR_STEPS[CurrentTabIndex - 1]);
  };
  const handleNextTab = () => {
    setCurrentTab(GENERATOR_STEPS[CurrentTabIndex + 1]);
  };

  const FormUi = useMemo(() => FormGenerator(), [currentTab]);
  return (
    <div className="px-3 xl:px-10 md:w-[50%] w-[100%] flex flex-col h-full pb-28 overflow-y-scroll pt-4">
      <div className="flex justify-center">
        {GENERATOR_STEPS.map((gen, index) => {
          return (
            <div
              key={gen.key}
              onClick={() => setCurrentTab(gen)}
              className={`items-center flex cursor-pointer text-xs mx-2 gap-2 cursor-pointe`}
            >
              <span>{gen.title}</span>
              {index !== GENERATOR_STEPS.length - 1 && (
                <ChevronRight size={12} />
              )}
            </div>
          );
        })}
      </div>

      {/* Generators */}

      <div className="flex flex-col items-center pt-10">
        <h1 className="text-2xl font-bold"> {currentTab.title} </h1>
        <p className="text-xs pt-1">{currentTab.description}</p>
      </div>

      {FormUi}

      <div className="flex justify-center gap-4 mt-auto w-full">
        <Button
          variant="ghost"
          className="text-xs px-4 py-2"
          onClick={handlePrevTab}
          disabled={CurrentTabIndex === 0}
        >
          Previous
        </Button>
        <Button
          className="text-xs px-4 py-2"
          onClick={handleNextTab}
          disabled={CurrentTabIndex === GENERATOR_STEPS.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Resume_Generator;

const GENERATOR_STEPS = [
  {
    title: "Resume Info",
    key: "resumeInfo",
    description: "Add small resume Title",
  },
  {
    title: "Personal Info",
    key: "personalInfo",
    description: "Add your personal info",
  },
  {
    title: "Work Experience",
    key: "workExperience",
    description: "You can add multiple job experiences",
  },
  {
    title: "Education",
    key: "education",
    description: "Add your educations",
  },
  {
    title: "Project",
    key: "project",
    description: "Add a Wonderful Projects",
  },
  {
    title: "Summary & Skills",
    key: "skillsSummary",
    description: "Add relevant skills according to your position",
  },
];
