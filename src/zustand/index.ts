import { create } from "zustand";
import { createResumeSlice, ResumeState } from "./slices/resumeSlice";
import { ResumeSkillState, skillsSlice } from "./slices/skillsSlice";
import { experienceSlice, ExperienceState } from "./slices/experienceSlice";
import { projectSlice, ProjectState } from "./slices/projectSlice";
import { educationSlice, EducationState } from "./slices/educationSlice";

type AppState = ResumeState &
  ResumeSkillState &
  ExperienceState &
  ProjectState &
  EducationState;

export const useAppStore = create<AppState>()((...a) => ({
  ...createResumeSlice(...a),
  ...skillsSlice(...a),
  ...experienceSlice(...a),
  ...projectSlice(...a),
  ...educationSlice(...a),
}));
