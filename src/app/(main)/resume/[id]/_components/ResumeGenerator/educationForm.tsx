import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EducationSchema, EducationType } from "@/lib/schemaValidations";
import { useAppStore } from "@/zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { AudioLines, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

const MultiEducationForm = () => {
  const education = useAppStore((state) => state.education);
  const updateEducationData = useAppStore((state) => state.updateEducationData);

  const addNewEducation = () => {
    const defaultEducation: EducationType = {
      school: "",
      field: "",
      graduation: "",
      location: "",
      achievement: "",
    };
    updateEducationData([...education, defaultEducation]);
  };

  const deleteEducation = (index: number) => {
    const updatedEducation = education.filter((_, idx) => idx !== index);
    updateEducationData(updatedEducation);
  };

  return (
    <div className="w-full text-sm py-4 grid gap-6">
      {education.map((edu, idx) => (
        <EducationSection
          key={idx}
          index={idx}
          data={edu}
          onDelete={deleteEducation}
        />
      ))}
      <Button onClick={addNewEducation} className="w-fit">
        Add New Education
      </Button>
    </div>
  );
};

const EducationSection = ({
  index,
  data,
  onDelete,
}: {
  index: number;
  data: EducationType;
  onDelete: (index: number) => void;
}) => {
  const onSubmit = (data: EducationType) => {
    handleUpdate(data);
  };

  const updateEducationData = useAppStore((state) => state.updateEducationData);
  const education = useAppStore((state) => state.education);

  const handleUpdate = (data: EducationType) => {
    const updatedEducation = [...education];
    updatedEducation[index] = data;
    updateEducationData(updatedEducation);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EducationSchema),
    defaultValues: data,
  });

  return (
    <div className="w-full mx-auto p-6 shadow-md border-gray-300 border-[1px] rounded-md text-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold mb-5">Education {index + 1}</h3>
        <span
          className="absolute top-6 right-6 cursor-pointer"
          onClick={() => onDelete(index)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash size={14} color="red" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Education</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* School */}
        <div>
          <label className="block font-medium mb-1">School</label>
          <Input
            type="text"
            placeholder="ABC School/College"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("school", {
              required: "school/college name required",
            })}
          />
          {errors.school && (
            <p className="text-red-500">{errors.school.message}</p>
          )}
        </div>
        {/* Field of Study */}
        <div>
          <label className="block font-medium mb-1">Field of Study</label>
          <Input
            type="text"
            placeholder="Computer Science"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("field", {
              required: "field name is required",
            })}
          />
          {errors.field && (
            <p className="text-red-500">{errors.field.message}</p>
          )}
        </div>
        {/* Graduation Period */}
        <div>
          <label className="block font-medium mb-1">Graduation Period</label>
          <Input
            type="text"
            placeholder="MM/YYYY - MM/YYYY"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("graduation", {
              required: "Graduation period is required",
            })}
          />
          {errors.graduation && (
            <p className="text-red-500">{errors.graduation.message}</p>
          )}
        </div>
        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <Input
            type="text"
            placeholder="Eg: Dehradun, Uttarakhand"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        {/* Achievements */}
        <div className="sm:col-span-2">
          <label className="block font-medium mb-1">Achievements</label>
          <Input
            type="text"
            placeholder="What are your academic achievements?"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("achievement")}
          />
          {errors.achievement && (
            <p className="text-red-500">{errors.achievement.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => null} className="text-xs">
            {false ? "Generating..." : "Enhance With Ai"}{" "}
            <AudioLines size={12} />
          </Button>

          <Button
            type="submit"
            variant={"ghost"}
            className="py-2 rounded-md text-xs"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MultiEducationForm;
