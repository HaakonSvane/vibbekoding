import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  className,
  ...rest
}) => {
  const inputId =
    id || rest.name || `input-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx("form-control", className)}
        {...rest}
      />
    </div>
  );
};
