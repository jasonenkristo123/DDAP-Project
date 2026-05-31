import React from "react";
import { SquareCheckBig } from "lucide-react";

export interface TemplateData {
  id_template?: number | string;
  title: string;
  category: string;
  description: string;
  priority: string;
  due_days: number;
}

interface TemplateCardProps {
  template: TemplateData;
  onUse: (template: TemplateData) => void;
}

export default function TemplateCard({ template, onUse }: TemplateCardProps) {
  return (
    <div className="bg-brownbold text-white rounded-lg p-5 flex flex-col justify-between min-h-[300px] shadow-[6px_6px_0px_0px_#4A3728]/50">
      <div className="space-y-4">
        <span className="inline-block bg-boldcream text-black text-sm font-bold px-2.5 py-0.5 rounded-md">
          {template.category}
        </span>
        <h3 className="text-2xl font-extrabold">{template.title}</h3>
        <div className="w-full h-[2px] bg-boldcream" />
        <p className="text-lg font-medium text-[#EFEAD8]">
          {template.description}
        </p>
        <p className="text-lg font-medium text-[#EFEAD8]">
          Priority: {template.priority}
        </p>
        <p className="text-lg font-medium text-[#EFEAD8]">
          Due Days: {template.due_days} days
        </p>
      </div>

      <div className="pt-12 mt-auto">
        <button
          type="button"
          onClick={() => onUse(template)}
          className="w-full py-2 bg-boldcream text-black font-bold text-sm uppercase tracking-wider rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#ede8d9] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_#ede8d9] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer text-center"
        >
          Use Templates
        </button>
      </div>
    </div>
  );
}
