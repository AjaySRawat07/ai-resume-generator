'use client';

import useDebounce from "@/hooks/useDebounce";
import { AutoResumeType, ExperienceType } from "@/lib/schemaValidations";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { saveFullResume } from "#/resume";

type AutoResumeProps = {
  resumeData:AutoResumeType,
  skipFirstSave:boolean
}

export default function useAutoSaveResume({resumeData,skipFirstSave=false}:AutoResumeProps) {
  const debouncedResumeData = useDebounce(resumeData, 3000);

  const [lastSavedData, setLastSavedData] = useState(resumeData);

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstLoadSaved, setFirstLoadSaved] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  async function save() {
    try {
      console.log('save call',resumeData)
      setIsSaving(true);
      setIsError(false);

      const updatedResume = await saveFullResume(resumeData);

      if(updatedResume.success && firstLoadSaved){
        toast.success('Saved!' ,{id:'success update'})
      }

      if(!firstLoadSaved) setFirstLoadSaved(true)
      console.log('latest save ', updatedResume)
      setLastSavedData(resumeData);

    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (hasUnsavedChanges && !skipFirstSave && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [ debouncedResumeData, isSaving, lastSavedData, isError,skipFirstSave]);

  return {
    isSaving,
  };
}