import { Button } from "@/components/ui/button";
import { useAppStore } from "@/zustand";
import { Palette } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const updateResumeData = useAppStore((state) => state.updateResumeData);
  const resumeState = useAppStore((state) => state.resumeState);

  const { colorHex } = resumeState;

  function handleOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      isPickerVisible &&
      target.classList &&
      !target.classList.contains("react-colorful__interactive")
    ) {
      setPickerVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutside);
    return () => {
      document.removeEventListener("click", handleOutside);
    };
  }, [isPickerVisible]);

  return (
    <div className="relative">
      {isPickerVisible && (
        <div className="colorBall right-0 bottom-10 absolute p-4 rounded-md">
          <HexColorPicker
            color={colorHex}
            onChange={(hex) => updateResumeData({ colorHex: hex })}
          />
        </div>
      )}

      <Button
        title="Pick Color"
        variant={"outline"}
        className="rounded-md"
        onClick={() => setPickerVisible((prev) => !prev)}
      >
        <Palette size={12} color="black" />
      </Button>
    </div>
  );
};

export default ColorPicker;
