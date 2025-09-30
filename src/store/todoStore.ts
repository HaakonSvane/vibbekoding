import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { loadTasks, saveTasks } from "@/lib/storage";
import { Task, TodoStore } from "@/lib/types";

// Don't load tasks at module evaluation (SSR). We'll hydrate client-side.
const initialTasks: Task[] = [];

const sortTasks = (
  tasks: Task[],
  sortBy: TodoStore["sortBy"],
  sortOrder: TodoStore["sortOrder"]
) => {
  const sorted = [...tasks].sort((a, b) => {
    if (sortBy === "createdAt") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    // status sort: completed last by default
    return a.status.localeCompare(b.status);
  });
  if (sortOrder === "desc") sorted.reverse();
  return sorted;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: initialTasks,
  filter: "all",
  searchQuery: "",
  sortBy: "createdAt",
  sortOrder: "asc",
  lastAction: undefined,
  initialized: false,

  addTask: (title, description) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuid(),
      title: title.trim(),
      description: description?.trim() || undefined,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    set((state) => {
      const tasks = sortTasks(
        [...state.tasks, newTask],
        state.sortBy,
        state.sortOrder
      );
      saveTasks(tasks);
      return {
        tasks,
        lastAction: { type: "create", taskId: newTask.id, timestamp: now },
      };
    });
  },

  updateTask: (id, updates) => {
    const now = new Date().toISOString();
    set((state) => {
      const prev = state.tasks.find((t) => t.id === id);
      if (!prev) return {} as Partial<TodoStore>;
      const updated: Task = {
        ...prev,
        ...("title" in updates
          ? { title: updates.title?.trim() || prev.title }
          : {}),
        ...("description" in updates
          ? { description: updates.description?.trim() || undefined }
          : {}),
        updatedAt: now,
      };
      const tasks = state.tasks.map((t) => (t.id === id ? updated : t));
      saveTasks(tasks);
      return {
        tasks,
        lastAction: {
          type: "update",
          taskId: id,
          previousData: prev,
          timestamp: now,
        },
      };
    });
  },

  toggleTask: (id) => {
    const now = new Date().toISOString();
    set((state) => {
      const tasks = state.tasks.map((t) => {
        if (t.id !== id) return t;
        const newStatus: Task["status"] =
          t.status === "pending" ? "completed" : "pending";
        return {
          ...t,
          status: newStatus,
          completedAt: newStatus === "completed" ? now : undefined,
          updatedAt: now,
        };
      });
      saveTasks(tasks);
      return {
        tasks,
        lastAction: { type: "toggle", taskId: id, timestamp: now },
      };
    });
  },

  deleteTask: (id) => {
    const now = new Date().toISOString();
    set((state) => {
      const prev = state.tasks.find((t) => t.id === id);
      const tasks = state.tasks.filter((t) => t.id !== id);
      saveTasks(tasks);
      return {
        tasks,
        lastAction: prev
          ? { type: "delete", taskId: id, previousData: prev, timestamp: now }
          : state.lastAction,
      };
    });
  },

  setFilter: (filter) => set({ filter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

  undoLastAction: () => {
    const last = get().lastAction;
    if (!last) return;
    if (last.type === "create") {
      get().deleteTask(last.taskId);
    } else if (last.type === "delete" && last.previousData) {
      set((state) => {
        const tasks = sortTasks(
          [...state.tasks, last.previousData as Task],
          state.sortBy,
          state.sortOrder
        );
        saveTasks(tasks);
        return { tasks, lastAction: undefined };
      });
    } else if (last.type === "update" && last.previousData) {
      set((state) => {
        const tasks = state.tasks.map((t) =>
          t.id === last.taskId ? (last.previousData as Task) : t
        );
        saveTasks(tasks);
        return { tasks, lastAction: undefined };
      });
    } else if (last.type === "toggle") {
      get().toggleTask(last.taskId);
    }
  },

  hydrate: () => {
    if (get().initialized) return;
    const loaded = loadTasks();
    set((state) => ({
      tasks: sortTasks(loaded, state.sortBy, state.sortOrder),
      initialized: true,
    }));
  },
}));
