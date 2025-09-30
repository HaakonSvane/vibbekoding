"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Task } from "@/lib/types";
import { useTodoStore } from "@/store/todoStore";
import { Button } from "@/components/ui/Button";

interface Props {
  task: Task;
}

export const TaskItem: React.FC<Props> = ({ task }) => {
  const toggleTask = useTodoStore((s) => s.toggleTask);
  const deleteTask = useTodoStore((s) => s.deleteTask);
  const updateTask = useTodoStore((s) => s.updateTask);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const onSave = () => {
    updateTask(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2"
      style={{ borderRadius: 8 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      transition={{ type: "spring", stiffness: 250, damping: 24 }}
    >
      <div className="form-check flex-grow-1">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => toggleTask(task.id)}
          id={`task-${task.id}`}
        />
        {isEditing ? (
          <div className="d-flex flex-column gap-2">
            <input
              className="form-control form-control-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-control form-control-sm"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ) : (
          <label
            className={`form-check-label ${
              task.status === "completed"
                ? "text-decoration-line-through text-muted"
                : ""
            }`}
            htmlFor={`task-${task.id}`}
          >
            <strong>{task.title}</strong>
            {task.description && (
              <span className="d-block small text-body-secondary">
                {task.description}
              </span>
            )}
          </label>
        )}
      </div>
      <div className="d-flex gap-2">
        {isEditing ? (
          <>
            <Button type="button" size="sm" onClick={onSave}>
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};
