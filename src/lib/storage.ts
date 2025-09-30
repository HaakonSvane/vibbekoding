import { Task, TaskSchema } from "./types";

const STORAGE_KEY = "todo-app-tasks";

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((t) => {
        const result = TaskSchema.safeParse(t);
        if (result.success) return result.data;
        return undefined;
      })
      .filter(Boolean) as Task[];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore
  }
};
