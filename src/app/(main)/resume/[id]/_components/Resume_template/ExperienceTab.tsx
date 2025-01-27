import { format } from "date-fns";
import React from "react";
import HexContainer from "./HexContainer";
import Headlines from "./Headlines";
import { useAppStore } from "@/zustand";
import { ExperienceType } from "@/lib/schemaValidations";

const ExperienceTab = () => {
   const experiences = useAppStore((state) => state.experiences);

  return (
    <HexContainer>
      <div className="flex w-full flex-col relative justify-between py-3 min-h-28">
        <Headlines title="Work Experience" />
        <div className="flex flex-col gap-1">
          {experiences.map((experience, index) => {
            return <ExperienceCard key={index} experience={experience} />;
          })}
        </div>
      </div>
    </HexContainer>
  );
};

export default ExperienceTab;

type ExperienceCardType = {
  experience: ExperienceType;
};

const ExperienceCard = ({ experience }: ExperienceCardType) => {
  const { content,location, position, companyName, startDate, endDate } = experience;
  return (
    <div className=" py-2">
      <div className="flex justify-between pb-1">
        <h2 className="text-black text-xs font-bold">{position}</h2>
        <h2 className="text-black text-xs font-bold">

          {startDate.length>0 ?  format(startDate, "MMM yyyy") :""} -{" "}

          {endDate === "Present"
            ? endDate
            : endDate.length>0?  format(new Date(endDate), "MMM yyyy"):''}
            &nbsp;
          / {location}

        </h2>
      </div>
      <div className="flex flex-col">
        <h2 className="text-black text-xs mb-1">{companyName}</h2>
        <p className="text-black text-xs whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
};
