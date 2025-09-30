"use client";
import React from "react";
import { useTodoStore } from "@/store/todoStore";
import { Button } from "@/components/ui/Button";

export const TaskFilters: React.FC = () => {
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);
  const searchQuery = useTodoStore((s) => s.searchQuery);
  const setSearchQuery = useTodoStore((s) => s.setSearchQuery);
  const sortBy = useTodoStore((s) => s.sortBy);
  const sortOrder = useTodoStore((s) => s.sortOrder);
  const setSorting = useTodoStore((s) => s.setSorting);
  const lastAction = useTodoStore((s) => s.lastAction);
  const undoLastAction = useTodoStore((s) => s.undoLastAction);

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <div className="btn-group" role="group" aria-label="Filter tasks">
        {(["all", "pending", "completed"] as const).map((f) => (
          <Button
            key={f}
            type="button"
            variant={filter === f ? "primary" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      <input
        type="search"
        className="form-control flex-grow-1"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search tasks"
      />
      <div className="d-flex gap-2">
        <select
          className="form-select"
          aria-label="Sort by"
          value={`${sortBy}:${sortOrder}`}
          onChange={(e) => {
            const [sb, so] = e.target.value.split(":");
            setSorting(sb as typeof sortBy, so as typeof sortOrder);
          }}
          style={{ maxWidth: 170 }}
        >
          <option value="createdAt:asc">Oldest first</option>
          <option value="createdAt:desc">Newest first</option>
          <option value="status:asc">Status A→Z</option>
          <option value="status:desc">Status Z→A</option>
        </select>
        <Button
          type="button"
          variant="outline"
          disabled={!lastAction}
          onClick={() => undoLastAction()}
          aria-disabled={!lastAction}
          title={lastAction ? "Undo last action" : "Nothing to undo"}
        >
          Undo
        </Button>
      </div>
    </div>
  );
};
