import { ProjectType } from "@/lib/schemaValidations";
import { StateCreator } from "zustand";


export interface ProjectState {
    projects: ProjectType[];
    updateProjectData: (data: ProjectType[]) => void;
}

export const projectSlice: StateCreator<ProjectState> = (set) => ({
    projects: [],
    updateProjectData: (data) =>
        set((state) => ({
            ...state,
            projects: data, 
        })),
});
