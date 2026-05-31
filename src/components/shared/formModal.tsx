"use client";
import { useEffect, useState } from "react";
import {
  X,
  Check,
  Tag,
  Calendar,
  AlertCircle,
  PencilLine,
  Clock,
} from "lucide-react";
import PrioritySelector from "./priority-selector";

// For Task and Template
export interface ModalFormData {
  id?: string;
  title: string;
  description?: string;
  priority?: string;
  category: string;
  dueDate?: string;
  dueDays?: number;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "task" | "template";
  types: string[];
  initialData?: ModalFormData | null;
  onSubmit: (data: ModalFormData) => Promise<void> | void;
}

export default function FormModal({
  isOpen,
  onClose,
  mode,
  types,
  initialData = null,
  onSubmit,
}: FormModalProps) {
  const isEditMode = !!initialData;

  // --- STATE FOR TASK ---
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskCategory, setTaskCategory] = useState("Work");
  const [taskDueDate, setTaskDueDate] = useState("");

  // --- STATE FOR TEMPLATE ---
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const [templateCategory, setTemplateCategory] = useState("College");
  const [templatePriority, setTemplatePriority] = useState("medium");
  const [templateDueDays, setTemplateDueDays] = useState<number | "">("");

  // --- STATE FOR UI ---
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormError("");
      setFormSuccess(false);
      setIsSubmitting(false);

      if (mode === "task") {
        setTaskTitle(initialData?.title || "");
        setTaskDesc(initialData?.description || "");
        setTaskPriority(initialData?.priority || "medium");
        setTaskCategory(initialData?.category || "Work");
        setTaskDueDate(initialData?.dueDate || "");
      } else {
        setTemplateTitle(initialData?.title || "");
        setTemplateDesc(initialData?.description || "");
        setTemplateCategory(initialData?.category || "College");
        setTemplatePriority(initialData?.priority || "medium");
        setTemplateDueDays(initialData?.dueDays ?? "");
      }
    }
  }, [isOpen, initialData, mode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // --- Validation
    if (mode === "task" && !taskTitle.trim()) {
      setFormError("Task Title is required!");
      return;
    }
    if (mode === "template" && !templateTitle.trim()) {
      setFormError("Template Title is required!");
      return;
    }
    if (mode === "template" && templateDueDays === "") {
      setFormError("Due Days is required for templates!");
      return;
    }

    setIsSubmitting(true);

    try {
      let payload: ModalFormData;

      if (mode === "task") {
        payload = {
          ...(initialData?.id && { id: initialData.id }),
          title: taskTitle.trim(),
          description: taskDesc,
          priority: taskPriority,
          category: taskCategory,
          dueDate: taskDueDate || undefined,
        };
      } else {
        payload = {
          ...(initialData?.id && { id: initialData.id }),
          title: templateTitle.trim(),
          description: templateDesc,
          priority: templatePriority,
          category: templateCategory,
          dueDays: Number(templateDueDays), // Convert string to pure int
        };
      }

      await onSubmit(payload);

      setFormSuccess(true);
      setTimeout(() => {
        onClose();
        setFormSuccess(false);
      }, 1500);
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div
        className="bg-boldcream border-[3px] border-brownbold rounded-xl shadow-[8px_8px_0px_0px_black]/50 max-w-lg w-full overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-[#4A3728] text-[#EFEAD8] px-6 py-4 flex justify-between items-center border-b-[3px] border-brownbold">
          <h2 className="text-lg font-bold tracking-wide uppercase flex items-center gap-2">
            <PencilLine className="w-5 h-5 text-[#FFDFB5]" />
            {isEditMode
              ? `Update ${mode === "task" ? "Task" : "Template"}`
              : `Create New ${mode === "task" ? "Task" : "Template"}`}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-[#EFEAD8]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        {formSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFDFB5] border-3 border-brownbold flex items-center justify-center shadow-[4px_4px_0px_0px_#4A3728] animate-bounce">
              <Check className="w-8 h-8 text-[#4A3728] stroke-3" />
            </div>
            <h3 className="text-xl font-extrabold text-brownbold tracking-tight">
              {isEditMode ? "Updated Successfully!" : "Created Successfully!"}
            </h3>
            <p className="text-sm font-medium text-brownbold/80 max-w-[280px]">
              Your data changes have been successfully saved and synchronized.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
          >
            {formError && (
              <div className="bg-red-100 border-2 border-red-800 text-red-800 px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold text-xs">
                <AlertCircle size={16} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {mode === "task" ? (
              /* --- Task Modal --- */
              <>
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="title"
                    className="text-xs uppercase font-extrabold text-brownbold block"
                  >
                    Task Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="e.g. Study Database Design Concepts"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border-2 border-brownbold rounded-lg text-brownbold font-semibold outline-none focus:ring-2 focus:ring-[#4A3728] placeholder-brownbold/40 text-sm"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="desc"
                    className="text-xs uppercase font-extrabold text-brownbold block"
                  >
                    Description
                  </label>
                  <textarea
                    id="desc"
                    rows={3}
                    placeholder="Write some details or steps to complete..."
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border-2 border-brownbold rounded-lg text-brownbold font-medium outline-none focus:ring-2 focus:ring-[#4A3728] placeholder-brownbold/40 text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs uppercase font-extrabold text-brownbold block">
                    Task Priority
                  </label>
                  <PrioritySelector
                    value={taskPriority}
                    onChange={setTaskPriority}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="category"
                      className="text-xs uppercase font-extrabold text-brownbold flex items-center gap-1"
                    >
                      <Tag size={13} /> Category
                    </label>
                    <select
                      id="category"
                      value={taskCategory}
                      onChange={(e) => setTaskCategory(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border-2 border-brownbold rounded-lg text-brownbold font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-[#4A3728]"
                    >
                      {types
                        .filter((t) => t !== "All")
                        .map((c) => (
                          <option
                            key={c}
                            value={c}
                            className="font-bold text-brownbold bg-boldcream"
                          >
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="dueDate"
                      className="text-xs uppercase font-extrabold text-brownbold flex items-center gap-1"
                    >
                      <Calendar size={13} /> Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-brownbold rounded-lg text-brownbold font-bold text-sm outline-none focus:ring-2 focus:ring-[#4A3728] cursor-pointer"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* --- Template Modal --- */
              <>
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="templateTitle"
                    className="text-xs uppercase font-extrabold text-brownbold block"
                  >
                    Template Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="templateTitle"
                    placeholder="e.g. Coursework, Habit Tracker..."
                    value={templateTitle}
                    onChange={(e) => setTemplateTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border-2 border-brownbold rounded-lg text-brownbold font-semibold placeholder-brownbold/40 text-sm"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="templateDesc"
                    className="text-xs uppercase font-extrabold text-brownbold block"
                  >
                    Template Description
                  </label>
                  <textarea
                    id="templateDesc"
                    rows={2}
                    placeholder="Briefly explain what this template is for..."
                    value={templateDesc}
                    onChange={(e) => setTemplateDesc(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border-2 border-brownbold rounded-lg text-brownbold font-medium outline-none focus:ring-2 focus:ring-[#4A3728] placeholder-brownbold/40 text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs uppercase font-extrabold text-brownbold block">
                    Default Priority
                  </label>
                  <PrioritySelector
                    value={templatePriority}
                    onChange={setTemplatePriority}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="templateCategory"
                      className="text-xs uppercase font-extrabold text-brownbold flex items-center gap-1"
                    >
                      <Tag size={13} /> Category
                    </label>
                    <select
                      id="templateCategory"
                      value={templateCategory}
                      onChange={(e) => setTemplateCategory(e.target.value)}
                      className="w-full px-3.5 py-2 bg-boldcream border-2 border-brownbold rounded-lg text-brownbold font-bold cursor-pointer text-sm"
                    >
                      {types.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="templateDueDays"
                      className="text-xs uppercase font-extrabold text-brownbold flex items-center gap-1"
                    >
                      <Clock size={13} /> Due Days{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="templateDueDays"
                        min="0"
                        placeholder="e.g. 3"
                        value={templateDueDays}
                        onChange={(e) =>
                          setTemplateDueDays(
                            e.target.value ? Number(e.target.value) : "",
                          )
                        }
                        className="w-full px-3.5 py-1.5 pr-10 bg-white border-2 border-brownbold rounded-lg text-brownbold font-bold text-sm outline-none focus:ring-2 focus:ring-[#4A3728]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brownbold/60">
                        Days
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-brownbold/15">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-transparent text-brownbold font-bold text-sm rounded-lg border-2 border-brownbold hover:bg-brownbold/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-brownbold text-white font-bold text-sm rounded-lg border-2 border-background-cream shadow-[4px_4px_0px_0px_#644a40] hover:translate-x-px hover:translate-y-px disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : mode === "task"
                      ? "Save Task"
                      : "Save Template"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
