import { StateCreator } from "zustand";


export interface ResumeSkillState {
    skillsState: string[];
    updateSkillsData: (skills: string[]) => void;
}

export const skillsSlice: StateCreator<ResumeSkillState> = (set) => ({
    skillsState: [],
    updateSkillsData: (skills) =>
        set((state) => ({
            ...state,
            skillsState: skills, 
        })),
});
