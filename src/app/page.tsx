"use client";
import { useEffect } from "react";
import { TaskForm } from "@/components/todo/TaskForm";
import { TaskFilters } from "@/components/todo/TaskFilters";
import { TaskList } from "@/components/todo/TaskList";
import { useTodoStore } from "@/store/todoStore";

export default function Home() {
  const hydrate = useTodoStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <>
      <div className="py-4">
        <div className="surface p-4 p-md-5 mb-4">
          <h1 className="h3 mb-4 heading-accent" style={{ fontSize: "1.9rem" }}>
            Your Tasks
          </h1>
          <TaskForm />
          <TaskFilters />
          <TaskList />
        </div>
      </div>
      <footer className="text-center text-muted small py-3">
        Local browser storage only. © {new Date().getFullYear()}
      </footer>
    </>
  );
}
