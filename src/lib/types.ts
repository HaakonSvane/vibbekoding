import { z } from "zod";

export const TaskStatusSchema = z.enum(["pending", "completed"]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: TaskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().optional(),
});
export type Task = z.infer<typeof TaskSchema>;

export interface UndoAction {
  type: "create" | "update" | "delete" | "toggle";
  taskId: string;
  previousData?: Partial<Task>;
  timestamp: string; // ISO date string
}

export interface TodoState {
  tasks: Task[];
  filter: "all" | "pending" | "completed";
  searchQuery: string;
  sortBy: "createdAt" | "status";
  sortOrder: "asc" | "desc";
  lastAction?: UndoAction;
  initialized: boolean; // whether tasks have been hydrated from storage
}

export interface TodoStore extends TodoState {
  addTask: (title: string, description?: string) => void;
  updateTask: (
    id: string,
    updates: Partial<Pick<Task, "title" | "description">>
  ) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TodoState["filter"]) => void;
  setSearchQuery: (query: string) => void;
  setSorting: (
    sortBy: TodoState["sortBy"],
    sortOrder: TodoState["sortOrder"]
  ) => void;
  undoLastAction: () => void;
  hydrate: () => void; // load tasks from persistent storage (no-op if already initialized)
}
