"use client";
import { useState } from "react";
import { dataTemplate } from "@/data/template";
import SearchSection from "../shared/search-section";
import TemplateCard, { TemplateData } from "./TemplateCard";
import FormModal, { ModalFormData } from "../shared/formModal";

export default function TemplatesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTriggerCreate = () => {
    setIsModalOpen(true);
  };

  const handleTemplateSubmit = async (payload: ModalFormData) => {
    console.log("SUCCESS CREATE NEW TEMPLATE:", payload);
    setIsModalOpen(false);
  };

  const handleUseTemplate = (template: TemplateData) => {
    const newTodoPayload = {
      id: Date.now(),
      title: `New ${template.title}`,
      desc: template.description || "No description",
      priority: template.priority || "medium",
      category: template.category,
      dateCreate: new Date().toLocaleDateString("id-ID"),
      progress: "ToDo",
    };
    console.log("🚀 MENGIRIM TODOS BARU DARI TEMPLATE:", newTodoPayload);

    alert(
      `Sukses menggunakan template "${template.title}"!\nData Todo baru telah tercetak di Console.`,
    );
  };

  return (
    <main className="p-4 md:px-8 lg:p-15 w-full min-h-full">
      <h1 className="font-semibold text-xl mb-4">Template Gallery</h1>
      <div className="border-b-3 border-black pb-8">
        <SearchSection
          showFilters={false}
          buttonText="New Template"
          onNewClick={handleTriggerCreate}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {dataTemplate.map((item, index) => (
          <TemplateCard
            key={index}
            template={item}
            onUse={handleUseTemplate} // 3. Oper fungsi penangan ke komponen anak
          />
        ))}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="template"
        types={["College", "Productivity", "Work", "Personal"]}
        onSubmit={handleTemplateSubmit}
      />
    </main>
  );
}
