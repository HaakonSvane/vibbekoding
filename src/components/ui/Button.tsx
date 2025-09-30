import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  motionPress?: boolean; // enable tap animation
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  danger: "btn btn-danger",
  outline: "btn btn-outline-secondary",
};

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  motionPress = false,
  ...rest
}) => {
  const classes = clsx(variantClass[variant], sizeClass[size], className);
  if (!motionPress) {
    return <button className={classes} {...rest} />;
  }
  // Wrap native button to avoid drag handler type conflicts with motion onDrag API
  return (
    <motion.div whileTap={{ scale: 0.94 }} style={{ display: "inline-flex" }}>
      <button className={classes} {...rest} />
    </motion.div>
  );
};
