import React, { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: RootLayoutProps) => {
  return <div className="w-screen pt-20">{children}</div>;
};

export default MainLayout;
