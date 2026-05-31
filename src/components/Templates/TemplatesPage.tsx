"use client";
import { useEffect, useState } from "react";
import SearchSection from "../shared/search-section";
import TemplateCard, { TemplateData } from "./TemplateCard";
import FormModal, { ModalFormData } from "../shared/formModal";
import { getAllTemplates, createTemplate, useTemplate } from "../api/templateApi";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch templates from the backend
  const fetchTemplates = async (searchQuery?: string) => {
    try {
      setIsLoading(true);
      const res = await getAllTemplates(searchQuery);
      setTemplates(res.data || []);
    } catch (err) {
      console.error("Failed to load templates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates(searchVal);
  }, [searchVal]);

  const handleTriggerCreate = () => {
    setIsModalOpen(true);
  };

  const handleTemplateSubmit = async (payload: ModalFormData) => {
    try {
      // Map frontend priority ("high", "medium", "low") to backend priority enum ("High", "Medium", "Low")
      const mappedPriority = payload.priority
        ? payload.priority.charAt(0).toUpperCase() + payload.priority.slice(1)
        : "Medium";

      await createTemplate({
        title: payload.title,
        description: payload.description || "",
        category: payload.category,
        priority: mappedPriority,
        due_days: payload.dueDays ?? 0,
      });

      setIsModalOpen(false);
      fetchTemplates(searchVal);
    } catch (err) {
      console.error("Failed to create template:", err);
      alert("Failed to create template. Please try again.");
    }
  };

  const handleUseTemplate = async (template: TemplateData) => {
    if (!template.id_template) {
      alert("Template ID is missing!");
      return;
    }

    try {
      await useTemplate(template.id_template);
      alert(`Success using template "${template.title}"! A new todo has been added to your list.`);
    } catch (err) {
      console.error("🚀 Error menggunakan template:", err);
      alert("Gagal menggunakan template. Silakan coba lagi.");
    }
  };

  return (
    <main className="p-4 md:px-8 lg:p-15 w-full min-h-full">
      <h1 className="font-semibold text-xl mb-4">Template Gallery</h1>
      <div className="border-b-3 border-black pb-8">
        <SearchSection
          showFilters={false}
          buttonText="New Template"
          onNewClick={handleTriggerCreate}
          onSearchChange={setSearchVal}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg font-bold text-brownbold animate-pulse">Loading templates...</p>
        </div>
      ) : templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-bold text-brownbold/70">No templates found.</p>
          <p className="text-sm text-brownbold/50">Try searching for something else or create a new template!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {templates.map((item, index) => (
            <TemplateCard
              key={item.id_template ?? index}
              template={item}
              onUse={handleUseTemplate}
            />
          ))}
        </div>
      )}

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
