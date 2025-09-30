import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="app-header mb-4 position-relative">
      <div className="container d-flex align-items-center justify-content-between">
        <span
          className="brand"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
        >
          Task Flow
        </span>
        <span className="small text-white-50 d-none d-sm-inline">
          Local Only
        </span>
      </div>
    </header>
  );
};
