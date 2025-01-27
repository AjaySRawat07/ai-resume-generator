import { ResumeType } from "@/lib/schemaValidations";
import { StateCreator } from "zustand";

export interface ResumeState {
  resumeState: ResumeType;
  updateResumeData: (data: object) => void;
}

export const createResumeSlice: StateCreator<ResumeState> = (set) => ({
  resumeState: DefaultState,
  updateResumeData: (data) =>
    set((state) => ({
      ...state,
      resumeState: { ...state.resumeState, ...data }, 
    })),
});

const DefaultState={
  id: "",
  userId: "",
  title: "",
  description: "",
  photoUrl: "",
  colorHex: "black",
  boarderStyle: "",
  summary: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  city: "",
  country: "",
  phone: "",
  email: "",
}