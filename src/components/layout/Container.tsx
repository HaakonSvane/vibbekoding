import React from "react";

export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="container">{children}</div>;
