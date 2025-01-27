import { ExperienceType } from "@/lib/schemaValidations";
import { StateCreator } from "zustand";

export interface ExperienceState {
  experiences: ExperienceType[];
  updateExperienceData: (data: ExperienceType[]) => void;
}

export const experienceSlice: StateCreator<ExperienceState> = (set) => ({
  experiences: [],
  updateExperienceData: (data) =>
    set((state) => ({
      ...state,
      experiences: data,
    })),
});
