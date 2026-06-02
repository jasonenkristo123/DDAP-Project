"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllTodos, updateTodos } from "@/components/api/todolistApi";

interface Todo {
  id?: number;
  id_todo?: number;
  title: string;
  description?: string;
  priority: string;
  category: string;
  created_at?: string;
  due_date?: string;
  status?: string;
}

type ColumnType = "ToDo" | "In Progress" | "Done";

const COLUMN_LABELS: Record<ColumnType, string> = {
  ToDo: "To Do",
  "In Progress": "In Progress",
  Done: "Done",
};

export default function KanbanPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllTodos({
        sortBy: "created_at",
        orderBy: "desc",
        limit: 100,
      });
      if (res && res.data) {
        setTodos(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch todos for Kanban board:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const getTodoId = (todo: Todo): number => {
    return Number(todo.id_todo ?? todo.id ?? 0);
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id);
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "move";

    // Make the drag ghost slightly transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.4";
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedId(null);
    setActiveColumn(null);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
  };

  const handleDragOver = (e: React.DragEvent, column: ColumnType) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setActiveColumn(column);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (!e.currentTarget.contains(relatedTarget)) {
      setActiveColumn(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetColumn: ColumnType) => {
    e.preventDefault();
    e.stopPropagation();

    const idStr = e.dataTransfer.getData("text/plain") || String(draggedId);
    const id = Number(idStr);

    if (!id || isNaN(id)) {
      setDraggedId(null);
      setActiveColumn(null);
      return;
    }

    const draggedTodo = todos.find((t) => getTodoId(t) === id);
    if (!draggedTodo) {
      setDraggedId(null);
      setActiveColumn(null);
      return;
    }

    const currentColumn = getStatusColumn(draggedTodo);
    if (currentColumn === targetColumn) {
      setDraggedId(null);
      setActiveColumn(null);
      return;
    }

    const statusMap: Record<ColumnType, string> = {
      ToDo: "ToDo",
      "In Progress": "In_Progress",
      Done: "Done",
    };
    const apiStatus = statusMap[targetColumn];
    const displayStatus =
      targetColumn === "In Progress" ? "In Progress" : targetColumn;
    const previousTodos = [...todos];

    setTodos((prev) =>
      prev.map((todo) => {
        if (getTodoId(todo) === id) {
          return { ...todo, status: displayStatus };
        }
        return todo;
      }),
    );

    try {
      await updateTodos(id, { status: apiStatus });
      await fetchTodos();
    } catch (err) {
      console.error("Failed to update status on drag drop:", err);
      setTodos(previousTodos);
    } finally {
      setDraggedId(null);
      setActiveColumn(null);
    }
  };

  const getStatusColumn = (todo: Todo): ColumnType => {
    const s = (todo.status || "ToDo").toLowerCase().replace(/_/g, " ");
    if (s === "todo" || s === "to do") return "ToDo";
    if (s === "in progress" || s === "inprogress") return "In Progress";
    if (s === "done") return "Done";
    return "ToDo";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    } catch {
      return dateStr;
    }
  };

  const getPriorityColor = (priority?: string) => {
    const p = (priority || "low").toLowerCase();
    if (p === "high") return "#FF3B30";
    if (p === "medium") return "#FF9500";
    if (p === "low") return "#34C759";
    if (p === "done") return "#34C759";
    return "#007AFF";
  };

  const getPriorityLabel = (priority?: string) => {
    const p = (priority || "Low").toLowerCase();
    if (p === "high") return "High";
    if (p === "medium") return "Medium";
    if (p === "low") return "Low";
    if (p === "done") return "Done";
    return priority || "Low";
  };

  const columns: ColumnType[] = ["ToDo", "In Progress", "Done"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#644a40] border-t-transparent rounded-full animate-spin" />
          <p className="text-base font-bold text-[#644a40]">
            Loading Kanban board...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-[650px]">
        {columns.map((column) => {
          const columnTodos = todos.filter(
            (todo) => getStatusColumn(todo) === column,
          );
          const isOver = activeColumn === column;

          return (
            <div
              key={column}
              onDragOver={(e) => handleDragOver(e, column)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column)}
              className="flex flex-col rounded-xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: isOver ? "#FFE0B2" : "#FFEAD0",
                border: isOver ? "2px dashed #644a40" : "2px solid transparent",
                transform: isOver ? "scale(1.01)" : "scale(1)",
              }}
            >
              <div className="py-3 px-4 text-center select-none bg-brownbold">
                <h2 className="text-xl xl:text-2xl font-bold tracking-wide text-boldcream">
                  {COLUMN_LABELS[column]}
                </h2>
              </div>

              <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
                {columnTodos.map((todo) => {
                  const id = getTodoId(todo);
                  const isDragging = draggedId === id;

                  return (
                    <div
                      key={`kanban-card-${id}`}
                      draggable
                      onDragStart={(e) => id && handleDragStart(e, id)}
                      onDragEnd={handleDragEnd}
                      className="group transition-all duration-200"
                      style={{
                        opacity: isDragging ? 0.4 : 1,
                        cursor: "grab",
                      }}
                    >
                      <div
                        className="rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-lg active:cursor-grabbing transition-all duration-200"
                        style={{
                          backgroundColor: "#F5E6D0",
                          border: "1px solid #D4B896",
                          boxShadow: "0 2px 6px rgba(100, 74, 64, 0.12)",
                        }}
                      >
                        {/* Decorative top handle — wavy torn edge */}
                        <div className="flex justify-center pt-2 pb-1">
                          <svg
                            width="64"
                            height="10"
                            viewBox="0 0 64 10"
                            fill="none"
                          >
                            <path
                              d="M2 5C6 2 10 8 14 5C18 2 22 8 26 5C30 2 34 8 38 5C42 2 46 8 50 5C54 2 58 8 62 5"
                              stroke="#C4A882"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <div className="px-4 pb-3">
                          {/* Title */}
                          <h4
                            className="text-sm md:text-base font-bold leading-snug mb-1"
                            style={{ color: "#3E2E23" }}
                          >
                            {todo.title}
                          </h4>

                          {/* Description */}
                          {todo.description && (
                            <p
                              className="text-xs leading-relaxed mb-3 line-clamp-3"
                              style={{ color: "#5C4A3E" }}
                            >
                              {todo.description}
                            </p>
                          )}

                          {/* Footer: Priority + Date */}
                          <div className="flex flex-col gap-1.5 mt-auto">
                            {/* Priority */}
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{
                                  backgroundColor: getPriorityColor(
                                    todo.priority,
                                  ),
                                }}
                              />
                              <span
                                className="text-[11px] font-semibold"
                                style={{ color: "#5C4A3E" }}
                              >
                                {getPriorityLabel(todo.priority)}
                              </span>
                            </div>

                            {/* Date range */}
                            <div
                              className="text-[11px] font-medium flex items-center gap-1 select-none"
                              style={{ color: "#8B7355" }}
                            >
                              <span>{formatDate(todo.created_at)}</span>
                              {todo.due_date && (
                                <>
                                  <span>→</span>
                                  <span>{formatDate(todo.due_date)}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Empty column drop zone */}
                {columnTodos.length === 0 && (
                  <div
                    className="flex-1 flex items-center justify-center rounded-lg p-6 min-h-[120px] transition-all duration-200"
                    style={{
                      border: "2px dashed #C4A882",
                      backgroundColor: isOver
                        ? "rgba(100, 74, 64, 0.06)"
                        : "transparent",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider text-center"
                      style={{ color: "#A08B72" }}
                    >
                      Drop Tasks Here
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
