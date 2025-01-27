import { EducationType } from "@/lib/schemaValidations";
import { StateCreator } from "zustand";

export interface EducationState {
  education: EducationType[];
  updateEducationData: (data: EducationType[]) => void;
}

export const educationSlice: StateCreator<EducationState> = (set) => ({
  education: [],
  updateEducationData: (data) =>
    set((state) => ({
      ...state,
      education: data,
    })),
});

