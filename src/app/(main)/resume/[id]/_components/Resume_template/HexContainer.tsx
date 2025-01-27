"use client";

import { useAppStore } from "@/zustand";
import React, { Fragment, ReactNode, useMemo } from "react";

type HexProps = {
  children: ReactNode;
};

const HexContainer = ({ children }: HexProps) => {
  const resumeState = useAppStore((state) => state.resumeState);
  const { colorHex } = resumeState;

  const lightenColorHex = useMemo(() => lightenColor(colorHex), [colorHex]);

  return (
    <Fragment>
      {children}
      <div
        style={{ borderColor: lightenColorHex }}
        className="w-full border-b-[0.5px]"
      />
    </Fragment>
  );
};

export default HexContainer;

function lightenColor(colorHex: string) {
  const percent = 80;
  const num = parseInt(colorHex.slice(1), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
  const g =
    ((num >> 8) & 0x00ff) +
    Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100));
  const b =
    (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100));

  return `rgb(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)})`;
}
