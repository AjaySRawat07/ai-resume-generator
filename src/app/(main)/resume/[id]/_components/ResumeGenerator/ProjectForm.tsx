import { generateProjects } from "#/generators";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema, ProjectType } from "@/lib/schemaValidations";
import { useAppStore } from "@/zustand";
import { AudioLines, Trash, X } from "lucide-react";
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

type ProjectCompProps = {
  project: ProjectType;
  position: number;
};

const MultiProjectForm = () => {
  const projects = useAppStore((state) => state.projects);
  const updateProjectData = useAppStore((state) => state.updateProjectData);

  const AddNewProject = () => {
    const defaultProject = {
      projectName: "",
      projectLink: "",
      content: "",
      skillsUsed: [],
    };
    updateProjectData([...projects, defaultProject]);
  };

  return (
    <div className="flex flex-col gap-5 py-4 items-center">
      {projects.map((project, index) => {
        return <ProjectForm key={index} project={project} position={index} />;
      })}
      {projects.length < 3 ? (
        <Button
          onClick={AddNewProject}
          variant={"outline"}
          className="w-fit text-black"
        >
          Add Project
        </Button>
      ) : null}
    </div>
  );
};

export default MultiProjectForm;

const ProjectForm = ({ project, position }: ProjectCompProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: project,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const projects = useAppStore((state) => state.projects);
  const updateProjectData = useAppStore((state) => state.updateProjectData);

  const handleUpdateCurrentProject = (data: ProjectType) => {
    const newProject = [...projects];
    newProject[position] = data;
    updateProjectData(newProject);
  };

  const removeProject = () => {
    const newProject = projects.filter((_, index) => index !== position);
    updateProjectData(newProject);
  };

  const onSubmit = (data: ProjectType) => {
    handleUpdateCurrentProject(data);
  };
  const handleAddSkill = () => {
    setValue("skillsUsed", [...watch("skillsUsed"), currentSkill]);
    setCurrentSkill("");
  };

  const removeSkill = (skill: string) => {
    const skills = watch("skillsUsed");
    const newSkills = skills.filter((el) => el !== skill);
    setValue("skillsUsed", newSkills);
  };

  const handleGenerateProject = async () => {
    setLoading(true);
    setError("");
    try {
      const input = watch();
      const userInput = `${input.content || ""}`;

      const output = await generateProjects(userInput);
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
    <div className="w-full mx-auto p-6  shadow-md border-gray-300 border-[1px] rounded-md text-sm mb-4 relative">
      <h1 className="text-sm font-bold mb-5">Project {position + 1}</h1>

      <span
        className="absolute top-6 right-6 cursor-pointer"
        onClick={removeProject}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Trash size={12} color="red" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-medium">Project Name</label>
          <Input
            type="text"
            className="p-2"
            {...register("projectName", {
              required: "Company name is required",
            })}
            placeholder="Eg: Location Tracker"
          />
          {errors.projectName && (
            <p className="text-red-500">{errors.projectName.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-medium">Project Url</label>
          <Input
            type="text"
            className="p-2"
            {...register("projectLink")}
            placeholder="Url for your project"
          />
          {errors.projectLink && (
            <p className="text-red-500">{errors.projectLink.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="title" className="text-sm font-medium">
            Skill
          </label>
          <div className="flex gap-2">
            <Input
              id="skill"
              className="text-sm"
              placeholder="Add SKills"
              onChange={(e) => setCurrentSkill(e.target.value)}
              value={currentSkill}
            />
            <Button
              variant={"ghost"}
              className="text-xs px-4 py-2"
              onClick={handleAddSkill}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 py-2 mb-4">
          {watch("skillsUsed").map((skill, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-blue-600 text-white  p-1 px-2 text-xxs "
              >
                <span>{skill}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  <X size={14} />
                </span>
              </div>
            );
          })}
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
          <Button onClick={handleGenerateProject} className="text-xs">
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
