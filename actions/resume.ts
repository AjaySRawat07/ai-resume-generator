"use server";

import db  from "@/lib/prisma";
import { isUserExist } from "./helpers";
import { revalidatePath } from "next/cache";
import { AutoResumeType } from "@/lib/schemaValidations";
import { Prisma } from '@prisma/client';

export async function createResume(){
    try{
        const user = await isUserExist();

        if (!user) {
            throw new Error("User does not exist");
          }
        
        const document= await db.resume.create({
            data: {
                userId:user.id,
            }
        });

        await db.resumeContent.create({
            data: { resumeId: document.id }
        });

        revalidatePath("/dashboard");
        return {success:true, data:document}
    }
    catch(error){
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}


export async function getAllUserResumes() {
    try{
        const user = await isUserExist();
        if (!user) {
            throw new Error("User does not exist");
          }
        

        const documents = await db.resume.findMany({
            where:{ userId: user.id },
            orderBy: { createdAt: "desc" },
        })

        return documents
    }
    catch(error){
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function getUserResume(resumeId:string) {
    try{
        const user = await isUserExist();
        if (!user) {
            throw new Error("User does not exist");
          }
        
        const resume = await db.resume.findUnique({
            where:{ 
                userId: user.id,
                id:resumeId 
            },
        })
        const resumeContent = await db.resumeContent.findUnique({
            where:{ 
                resumeId:resumeId 
            },
        })
        if(!resumeContent || !resume){
            throw new Error("An unknown error occurred");
        }

        const Data={
            educations:resumeContent.education,
            resumeData:resume,
            projectData:resumeContent.projectDetails,
            experienceData:resumeContent.experience,
            skills:resumeContent.skills
        }
        return Data
    }
    catch(error){
        console.log(error)
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function saveFullResume(resumeData:AutoResumeType) {
    try{
        const user = await isUserExist();
        if (!user) {
            throw new Error("User does not exist");
          }
        
        const resumeId=resumeData.resumeData.id
        
        const { educations, resumeData:ResumeCoverData,projectData,experienceData,skills} = resumeData
        const resume = await db.$transaction(async (tx: Prisma.TransactionClient) => {
            const existingResume = await tx.resume.findFirst({
              where: {
                id: resumeId,
                userId: user.id,
              },
            });
          
            if (!existingResume) {
              throw new Error(`No resume found with id: ${resumeId} and userId: ${user.id}`);
            }
          
            const updatedResume = await tx.resume.update({
              where: { id: resumeId },
              data: ResumeCoverData,
            });
          
            const resumeContent = await tx.resumeContent.findFirst({
              where: { resumeId: resumeId },
            });
          
            if (!resumeContent) {
              throw new Error(`No resume content found with resumeId: ${resumeId}`);
            }
          
            await tx.resumeContent.update({
              where: { id: resumeContent.id },
              data: {
                skills: skills,
                projectDetails: projectData,
                experience: experienceData,
                education: educations,
              },
            });

            const Data={
                educations:resumeContent.education,
                resumeData:updatedResume,
                projectData:resumeContent.projectDetails,
                experienceData:resumeContent.experience,
                skills:resumeContent.skills
            }
            return { success: true, updatedResume:Data };
          });

        return resume
    }
    catch(error){
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
