"use client";
import { useState } from "react";
import { dataPinned } from "@/data/todos";
import SearchSection from "../shared/search-section";
import TodoItem from "./TodoItem";
import FormModal, { ModalFormData } from "../shared/formModal";

export default function TodosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ModalFormData | null>(null);

  const handleTriggerEdit = (item: any) => {
    setEditData({
      id: item.id,
      title: item.title,
      description: item.description || item.desc,
      priority: item.priority.toLowerCase(),
      category: item.category,
      dueDate: item.dueDate || item.dateDone,
    });
    setIsModalOpen(true);
  };

  const handleTriggerCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (payload: ModalFormData) => {
    if (payload.id) {
      console.log("Update Data:", payload);
    } else {
      console.log("Create Data:", payload);
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
      />
      <div className="mt-10">
        {dataPinned.map((data, index) => (
          <TodoItem
            key={`todo-${index}`}
            data={data}
            onEditClick={handleTriggerEdit}
          />
        ))}
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
