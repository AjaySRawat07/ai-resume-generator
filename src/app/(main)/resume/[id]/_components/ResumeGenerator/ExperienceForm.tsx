import { generateExperience } from "#/generators";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { experienceSchema, ExperienceType } from "@/lib/schemaValidations";
import { useAppStore } from "@/zustand";
import { AudioLines, Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type ExperienceCompProps = {
  experience: ExperienceType;
  position: number;
};

const MultiExperienceForm = () => {
  const experiences = useAppStore((state) => state.experiences);
  const updateExperienceData = useAppStore(
    (state) => state.updateExperienceData,
  );

  const AddNewExperience = () => {
    const defaultExperience = {
      position: "",
      companyName: "",
      startDate: "",
      endDate: "",
      content: ``,
      location: "",
    };
    updateExperienceData([...experiences, defaultExperience]);
  };

  return (
    <div className="flex flex-col gap-5 py-4 items-center">
      {experiences.map((experience, index) => {
        return (
          <ExperienceForm
            key={index}
            experience={experience}
            position={index}
          />
        );
      })}
      {experiences.length < 3 ? (
        <Button
          onClick={AddNewExperience}
          variant={"outline"}
          className="w-fit text-black"
        >
          Add Experience
        </Button>
      ) : null}
    </div>
  );
};

export default MultiExperienceForm;

const ExperienceForm = ({ experience, position }: ExperienceCompProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: experience,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const updateExperienceData = useAppStore(
    (state) => state.updateExperienceData,
  );
  const experiences = useAppStore((state) => state.experiences);

  const handleUpdateCurrentExperience = (data: ExperienceType) => {
    const newExperience = [...experiences];
    newExperience[position] = data;
    updateExperienceData(newExperience);
  };

  const removeExperience = () => {
    const newExperience = experiences.filter((_, index) => index !== position);
    updateExperienceData(newExperience);
  };

  const onSubmit = (data: ExperienceType) => {
    handleUpdateCurrentExperience(data);
  };

  const handleGenerateExperience = async () => {
    setLoading(true);
    setError("");
    try {
      const input = watch();
      const userInput = `${input.content || ""}`;

      const output = await generateExperience(userInput);
      toast.success("Please save the content if its good!");
      setValue("content", output);
    } catch (err) {
      console.error("Error generating experience:", err);
      setError("Failed to generate experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6  shadow-md border-[1px] bord rounded-md text-sm mb-4 relative">
      <h1 className="text-sm font-bold mb-5">Work Experience {position + 1}</h1>

      <span
        className="absolute top-6 right-6 cursor-pointer"
        onClick={removeExperience}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Trash size={14} color="red" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Experience</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Company Name */}
        <div className="mb-4">
          <label className="block font-medium">Company Name</label>
          <Input
            type="text"
            className="p-2"
            {...register("companyName", {
              required: "Company name is required",
            })}
            placeholder="Eg: Acme Corp"
          />
          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-medium">Job Title</label>
          <Input
            type="text"
            className="p-2"
            {...register("position", { required: "Job title is required" })}
            placeholder="Eg: Software Engineer"
          />
          {errors.position && (
            <p className="text-red-500">{errors.position.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block font-medium">Location</label>
          <Input
            type="text"
            className="p-2"
            {...register("location", { required: "Location is required" })}
            placeholder="Eg: New York, NY"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block font-medium">Start Date</label>
          <Input type="date" className="p-2" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-red-500">{errors.startDate.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">End Date</label>
          <Input
            type="date"
            className="w-full border rounded-md p-2"
            {...register("endDate")}
            disabled={watch("endDate") === "Present"}
            style={{ opacity: watch("endDate") === "Present" ? "0.6" : "1" }}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={watch("endDate") === "Present" ? true : false}
            onChange={(e) =>
              setValue("endDate", e.target.checked ? "Present" : "")
            }
          />
          <label className="font-medium">I currently work here</label>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Details</label>
          <Textarea
            className="w-full border rounded-md p-2"
            {...register("content")}
            rows={6}
            placeholder="Describe your responsibilities, achievements, etc."
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerateExperience} className="text-xs">
            {loading ? "Generating..." : "Enhance With Ai"}{" "}
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
