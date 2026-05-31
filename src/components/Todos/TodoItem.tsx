"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Star, Trash } from "lucide-react";

interface TodoData {
  id?: number;
  id_todo?: number;
  title: string;
  desc?: string;
  description?: string;
  priority: string;
  dateCreate?: string;
  created_at?: string;
  dateDone?: string;
  due_date?: string;
  progress?: string;
  status?: string;
  category?: string;
}

export default function TodoItem({
  data,
  onEditClick,
  onDeleteClick,
  onPinChange,
}: {
  data: TodoData;
  onEditClick: (data: TodoData) => void;
  onDeleteClick?: (id: number) => void;
  onPinChange?: (id: number, pinned: boolean) => void;
}) {
  const [isPinned, setIsPinned] = useState(false);
  const searchParams = useSearchParams();

  const todoId = data.id_todo ?? data.id;

  // Initialize pin state from localStorage on mount
  useEffect(() => {
    if (todoId === undefined) return;
    try {
      const stored = localStorage.getItem("pinnedTodoIds");
      const pinnedIds: number[] = stored ? JSON.parse(stored) : [];
      setIsPinned(pinnedIds.includes(Number(todoId)));
    } catch {
      setIsPinned(false);
    }
  }, [todoId]);

  const handlePinned = () => {
    if (todoId === undefined) return;
    const numId = Number(todoId);
    try {
      const stored = localStorage.getItem("pinnedTodoIds");
      let pinnedIds: number[] = stored ? JSON.parse(stored) : [];
      const newPinned = !isPinned;
      if (newPinned) {
        if (!pinnedIds.includes(numId)) pinnedIds.push(numId);
      } else {
        pinnedIds = pinnedIds.filter((id) => id !== numId);
      }
      localStorage.setItem("pinnedTodoIds", JSON.stringify(pinnedIds));
      setIsPinned(newPinned);
      onPinChange?.(numId, newPinned);
    } catch (err) {
      console.error("Failed to update pinned todos:", err);
    }
  };

  const highlightId = searchParams.get("highlight");
  const [isHighlighted, setIsHighlighted] = useState(false);

  const currentId = String(data.id_todo ?? data.id ?? "");

  useEffect(() => {
    if (highlightId && highlightId === currentId) {
      setIsHighlighted(true);

      const element = document.getElementById(`todo-card-${currentId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // 2 Second Highlight
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [highlightId, currentId]);

  // Fallbacks for display
  const displayDesc = data.description ?? data.desc ?? "";
  const displayPriority = data.priority ?? "low";
  const displayProgress = data.status ?? data.progress ?? "ToDo";
  const displayDateCreate = data.created_at 
    ? new Date(data.created_at).toLocaleDateString("en-GB") 
    : (data.dateCreate ?? "");
  const displayDateDone = data.due_date 
    ? new Date(data.due_date).toLocaleDateString("en-GB") 
    : (data.dateDone ?? "");

  return (
    <div className="w-full mt-3">
      <div
        id={`todo-card-${currentId}`}
        className={`pb-2 px-2 rounded-md transition-all duration-300 ${isHighlighted
          ? "animate-highlight border-[#4A3728] ring-2 ring-[#4A3728]/30"
          : ""
          }`}
      >
        <div className="w-full bg-black h-[3px]" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <h1
              className="text-2xl font-semibold hover:underline cursor-pointer"
              onClick={() => onEditClick(data)}
            >
              {data.title}
            </h1>
            <div className="bg-gray-300 rounded-full px-2 font-semibold">
              <p>{displayProgress}</p>
            </div>
          </div>
          <div
            onClick={handlePinned}
            className={`bg-boldcream border-2 border-brownbold max-w-[7%] w-full flex items-center justify-center gap-2 rounded-sm transition-all duration-200 cursor-pointer ${isPinned ? "translate-x-[4px] translate-y-[4px] shadow-[2px_2px_0px_0px_#644a40]" : "shadow-[6px_6px_0px_0px_#644a40] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px_#644a40]"}`}
          >
            <Star fill="yellow" className="w-5 h-5" />
            <p className="font-bold">Pin</p>
          </div>
        </div>
        <h2 className="text-xl font-light font-sans">{displayDesc}</h2>
        <div className="flex items-center justify-between gap-6 mt-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div
                className={`${displayPriority.toLowerCase() === "high" ? "bg-red-500" : displayPriority.toLowerCase() === "medium" ? "bg-orange-400" : displayPriority.toLowerCase() === "low" ? "bg-green-500" : "bg-blue-500"} w-3 h-3 rounded-full `}
              />
              <p className="capitalize font-medium">{displayPriority}</p>

            </div>
            <div className="flex items-center gap-2">
              <p>{displayDateCreate}</p>
              <ArrowRight size={17} />
              <p>{displayDateDone}</p>
            </div>
          </div>


          <div 
            className="cursor-pointer"
            onClick={() => {
              const id = data.id_todo ?? data.id;
              if (id !== undefined && onDeleteClick) {
                onDeleteClick(id);
              }
            }}
          >
            <Trash fill="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
