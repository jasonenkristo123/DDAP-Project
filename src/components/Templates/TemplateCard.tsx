import React from "react";
import { SquareCheckBig } from "lucide-react";

export interface TemplateData {
  title: string;
  category: string;
  requirements: string[];
}

interface TemplateCardProps {
  template: TemplateData;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="bg-brownbold text-white rounded-lg p-5 flex flex-col justify-between min-h-[300px] shadow-[6px_6px_0px_0px_#4A3728]/50">
      <div className="space-y-4">
        <span className="inline-block bg-boldcream text-black text-sm font-bold px-2.5 py-0.5 rounded-md">
          {template.category}
        </span>
        <h3 className="text-2xl font-extrabold">{template.title}</h3>
        {/* Line */}
        <div className="w-full h-[2px] bg-boldcream" />
        {/* Daftar Requirements / Checkbox List */}
        <ul className="space-y-3 pt-1">
          {template.requirements.map((req, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm font-medium text-[#EFEAD8]/90"
            >
              {/* Kotak Checkbox Kosong Khas Retro */}
              <SquareCheckBig />
              <span className="text-base">{req}</span>
            </li>
          ))}
          {/* empty requirement*/}
          {template.requirements.length === 0 && (
            <li className="italic text-boldcream/70">
              No requirements defined
            </li>
          )}
        </ul>
      </div>

      {/* Bagian Bawah: Tombol Aksi */}
      <div className="pt-12 mt-auto">
        <button
          type="button"
          className="w-full py-2 bg-boldcream text-black font-bold text-sm uppercase tracking-wider rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#ede8d9] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_#ede8d9] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer text-center"
        >
          Use Templates
        </button>
      </div>
    </div>
  );
}
