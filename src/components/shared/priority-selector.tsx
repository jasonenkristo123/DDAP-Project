"use client";

interface PrioritySelectorProps {
  value: string;
  onChange: (priority: string) => void;
}

export default function PrioritySelector({
  value,
  onChange,
}: PrioritySelectorProps) {
  const priorities = ["high", "medium", "low"];

  const configs: Record<string, { bg: string; text: string; dot: string }> = {
    high: { bg: "bg-[#EA4335]", text: "text-white", dot: "bg-red-600" },
    medium: {
      bg: "bg-[#FBBC05]",
      text: "text-brownbold",
      dot: "bg-yellow-500",
    },
    low: { bg: "bg-[#34A853]", text: "text-white", dot: "bg-green-600" },
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {priorities.map((prio) => {
        const active = value === prio;
        return (
          <button
            key={prio}
            type="button"
            onClick={() => onChange(prio)}
            className={`py-2 px-3 border-2 border-brownbold rounded-lg font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              active
                ? `${configs[prio].bg} ${configs[prio].text} shadow-[2px_2px_0px_0px_#4A3728] translate-x-px translate-y-px`
                : `bg-transparent opacity-60 hover:opacity-100`
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${configs[prio].dot} border border-black shrink-0`}
            />
            {prio.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
