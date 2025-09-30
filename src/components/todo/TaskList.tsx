"use client";
import React, { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TaskItem } from "./TaskItem";
import { useTodoStore } from "@/store/todoStore";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export const TaskList: React.FC = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const filter = useTodoStore((s) => s.filter);
  const searchQuery = useTodoStore((s) => s.searchQuery);
  const sortBy = useTodoStore((s) => s.sortBy);
  const sortOrder = useTodoStore((s) => s.sortOrder);
  const initialized = useTodoStore((s) => s.initialized);
  const hydrate = useTodoStore((s) => s.hydrate);
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (filter !== "all") {
      list = list.filter((t) => t.status === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === "createdAt") {
        const diff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? diff : -diff;
      }
      if (sortBy === "status") {
        const diff = a.status.localeCompare(b.status);
        return sortOrder === "asc" ? diff : -diff;
      }
      return 0;
    });
    return list;
  }, [tasks, filter, searchQuery, sortBy, sortOrder]);

  return (
    <div>
      {!initialized && (
        <div className="text-muted small mb-2" aria-live="polite">
          Loading tasks...
        </div>
      )}
      {initialized && filtered.length === 0 && (
        <div className="alert alert-info" role="status">
          No tasks yet. Add one above.
        </div>
      )}
      <ul
        className="list-group position-relative"
        style={{ overflow: "hidden" }}
      >
        <AnimatePresence initial={false}>
          {filtered.map((task) => (
            <motion.li
              layout={!reduceMotion}
              key={task.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -6, scale: 0.97 }
              }
              transition={
                reduceMotion
                  ? { duration: 0.1 }
                  : { duration: 0.22, ease: "easeOut" }
              }
              className="list-group-item p-0 border-0 bg-transparent"
            >
              <TaskItem task={task} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
