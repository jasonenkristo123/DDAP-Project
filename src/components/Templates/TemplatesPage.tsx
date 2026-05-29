"use client";
import { dataTemplate } from "@/data/template";
import SearchSection from "../shared/search-section";
import TemplateCard from "./TemplateCard";

export default function TemplatesPage() {
  return (
    <main className="p-4 md:px-8 lg:p-15 w-full min-h-full">
      <h1 className="font-semibold text-xl mb-4">Template Gallery</h1>
      <div className="border-b-3 border-black pb-8">
        <SearchSection
          showFilters={false}
          buttonText="New Template"
          mode="template"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {dataTemplate.map((item, index) => (
          <TemplateCard key={index} template={item} />
        ))}
      </div>
    </main>
  );
}
