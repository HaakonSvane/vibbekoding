"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useTodoStore } from "@/store/todoStore";
import { Button } from "@/components/ui/Button";

interface Props {
  onCreated?: () => void;
}

export const TaskForm: React.FC<Props> = ({ onCreated }) => {
  const addTask = useTodoStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, description);
    setTitle("");
    setDescription("");
    onCreated?.();
  };

  return (
    <motion.form
      onSubmit={submit}
      className="card card-body mb-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      layout
    >
      <div className="mb-2">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="desc">
          Description (optional)
        </label>
        <textarea
          id="desc"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      <div className="d-flex gap-2">
        <Button type="submit" disabled={!title.trim()} data-motion="true">
          Add Task
        </Button>
      </div>
    </motion.form>
  );
};
