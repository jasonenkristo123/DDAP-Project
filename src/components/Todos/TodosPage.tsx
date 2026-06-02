"use client";
import { useState, useEffect } from "react";
import SearchSection from "../shared/search-section";
import TodoItem from "./TodoItem";
import FormModal, { ModalFormData } from "../shared/formModal";
import {
  getAllTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  todoData,
} from "@/components/api/todolistApi";

export default function TodosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ModalFormData | null>(null);
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter/Sort State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Default");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      let sortBy: string | undefined = undefined;
      let orderBy: string | undefined = undefined;

      if (sortOption === "Priority (High → Low)") {
        sortBy = "priority";
        orderBy = "desc";
      } else if (sortOption === "Priority (Low → High)") {
        sortBy = "priority";
        orderBy = "asc";
      } else if (sortOption === "Date (Newest First)") {
        sortBy = "created_at";
        orderBy = "desc";
      } else if (sortOption === "Date (Oldest First)") {
        sortBy = "created_at";
        orderBy = "asc";
      }

      const params = {
        search: search.trim() || undefined,
        category: category !== "All" ? category : undefined,
        sortBy,
        orderBy,
      };

      const res = await getAllTodos(params);
      if (res && res.data) {
        setTodos(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search, category, sortOption]);

  const handleTriggerEdit = (item: any) => {
    let formattedDate = "";
    if (item.due_date) {
      formattedDate = new Date(item.due_date).toISOString().split("T")[0];
    } else if (item.dueDate || item.dateDone) {
      const dateRaw = item.dueDate || item.dateDone;
      if (dateRaw && dateRaw.includes("/")) {
        const parts = dateRaw.split("/");
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    setEditData({
      id: String(item.id_todo ?? item.id),
      title: item.title,
      description: item.description ?? item.desc,
      priority: (item.priority ?? "medium").toLowerCase(),
      category: item.category ?? "Work",
      dueDate: formattedDate,
    });
    setIsModalOpen(true);
  };

  const handleTriggerCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (payload: ModalFormData) => {
    const dataToSend: todoData = {
      title: payload.title,
      description: payload.description,
      priority: payload.priority ?? "medium",
      category: payload.category,
      due_date: payload.dueDate
        ? new Date(payload.dueDate).toISOString()
        : undefined,
    };

    if (payload.id) {
      await updateTodos(Number(payload.id), dataToSend);
    } else {
      await createTodos(dataToSend);
    }
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete this task?")) {
        await deleteTodos(id);
        fetchTodos();
      }
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const types = ["All", "Work", "Study", "Personal", "Urgent"];
  const sortOptions = [
    "Default",
    "Priority (High → Low)",
    "Priority (Low → High)",
    "Date (Newest First)",
    "Date (Oldest First)",
  ];

  return (
    <div className="p-4 md:p-8 lg:p-15 w-full">
      <SearchSection
        types={types}
        sortOptions={sortOptions}
        onNewClick={handleTriggerCreate}
        onSearchChange={setSearch}
        onTypeChange={setCategory}
        onSortChange={setSortOption}
      />
      <div className="mt-10">
        {loading ? (
          <p className="text-center font-bold text-brownbold">
            Loading tasks...
          </p>
        ) : todos.length === 0 ? (
          <p className="text-center text-brownbold/60 font-semibold">
            No tasks found.
          </p>
        ) : (
          todos.map((data, index) => (
            <TodoItem
              key={`todo-${data.id_todo ?? data.id ?? index}`}
              data={data}
              onEditClick={handleTriggerEdit}
              onDeleteClick={handleDelete}
            />
          ))
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        mode="task"
        types={types}
        initialData={editData}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
