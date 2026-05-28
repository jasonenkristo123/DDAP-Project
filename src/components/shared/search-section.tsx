"use client"
import { Search, Triangle, PencilLine, X, Check, Calendar, Tag, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchSection {
    types: string[];
    sortOptions: string[];
    showCreateForm?: boolean;
}

export default function SearchSection({ types, sortOptions, showCreateForm = true }: SearchSection) {

    const [isSearching, setIsSearching] = useState(false);
    const [isType, setIsType] = useState(false);
    const [isSort, setIsSort] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const [selectedType, setSelectedType] = useState("Type");
    const [selectedSort, setSelectedSort] = useState("Sort By");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskPriority, setTaskPriority] = useState("medium"); // "high" | "medium" | "low"
    const [taskCategory, setTaskCategory] = useState("Work");
    const [taskDueDate, setTaskDueDate] = useState("");

    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = () => {
        setIsSearching(!isSearching);
        setIsType(false);
        setIsSort(false);
    }

    const handleType = () => {
        setIsType(!isType);
        setIsSearching(false);
        setIsSort(false);
    }

    const handleSort = () => {
        setIsSort(!isSort);
        setIsSearching(false);
        setIsType(false);
    }

    const handleNew = () => {
        setIsNew(true);
        setTaskTitle("");
        setTaskDesc("");
        setTaskPriority("medium");
        setTaskCategory("Work");
        setTaskDueDate("");
        setFormError("");
        setFormSuccess(false);
        setIsSubmitting(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearching(false);
                setIsType(false);
                setIsSort(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Lock body scrolling when modal is open
    useEffect(() => {
        if (isNew) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isNew]);

    // Handle Task Form Submit
    const handleCreateTask = (e: React.SubmitEvent) => {
        e.preventDefault();
        
        if (!taskTitle.trim()) {
            setFormError("Task Title is required!");
            return;
        }

        setFormError("");
        setIsSubmitting(true);

        setTimeout(() => {
            const newTaskPayload = {
                title: taskTitle,
                description: taskDesc,
                priority: taskPriority,
                category: taskCategory,
                dueDate: taskDueDate || null,
                createdAt: new Date().toISOString()
            };

            console.log("SUCCESS: New todo payload prepared for API:", newTaskPayload);
            setIsSubmitting(false);
            setFormSuccess(true);

            setTimeout(() => {
                setIsNew(false);
                setFormSuccess(false);
            }, 1500);

        }, 800);
    }

    return (
        <div ref={searchRef} className={`grid grid-cols-4 ${showCreateForm ? "md:grid-cols-7" : "md:grid-cols-8"} gap-2 relative`}>
            {isSearching ? (
                <div className="bg-boldcream border-2 rounded-sm gap-2 border-brownbold flex col-span-4 items-center justify-center neodesign relative h-10 px-2">
                    <input 
                        type="text" 
                        placeholder="Search Your Todolist..." 
                        className="w-full pl-8 outline-none text-brownbold font-semibold text-sm placeholder-brownbold/45 bg-transparent" 
                        autoFocus
                    />
                    <Search size={18} className="absolute left-2.5 text-brownbold/75" />
                    <button 
                        onClick={() => setIsSearching(false)}
                        className="p-0.5 hover:bg-brownbold/10 rounded cursor-pointer"
                    >
                        <X size={16} className="text-brownbold" />
                    </button>
                </div>
            ) : (
                <div 
                    onClick={handleSearch} 
                    className="bg-boldcream border-2 rounded-sm gap-2 border-brownbold flex col-span-4 items-center justify-center neodesign cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors"
                >
                    <Search size={20} className="text-brownbold" />
                    <p className="font-semibold text-brownbold select-none text-sm md:text-base">
                        Search
                    </p>
                </div>
            )}

            <div className={`relative col-span-1 ${showCreateForm ? "md:col-span-1" : " col-span-2 md:col-span-2"} `}>
                <button 
                    onClick={handleType} 
                    className="w-full bg-boldcream border-2 rounded-sm gap-1.5 border-brownbold neodesign flex items-center justify-center cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors px-1 "
                >
                    <span className="font-semibold text-brownbold select-none text-xs md:text-sm truncate">
                        {selectedType}
                    </span>
                    <Triangle 
                        size={10} 
                        fill="#4A3728" 
                        className={`text-brownbold shrink-0 transition-transform duration-250 ${isType ? 'rotate-180' : ''}`} 
                    />
                </button>

                {isType && (
                    <div className={`absolute top-[calc(100%+6px)] left-0 w-full bg-boldcream border-2 border-brownbold rounded-md shadow-[4px_4px_0px_0px_#4A3728] z-50 flex flex-col text-left py-1 text-xs md:text-sm animate-in fade-in slide-in-from-top-1 duration-150`}>
                        {types.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedType(type === "All" ? "Type" : type);
                                    setIsType(false);
                                }}
                                className={`w-full text-left px-3 py-2 font-bold text-brownbold hover:bg-[#4A3728] hover:text-[#EFEAD8] transition-colors duration-150 flex items-center justify-between ${
                                    (type === "All" && selectedType === "Type") || selectedType === type ? 'bg-[#4A3728]/10' : ''
                                }`}
                            >
                                <span>{type}</span>
                                {((type === "All" && selectedType === "Type") || selectedType === type) && <Check size={14} className="shrink-0" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* "Sort By" Filter Dropdown */}
            <div className={`relative col-span-2 ${showCreateForm ? "md:col-span-1" : "md:col-span-2"}`}>
                <button 
                    onClick={handleSort} 
                    className="w-full bg-boldcream border-2 rounded-sm gap-1.5 border-brownbold neodesign flex items-center justify-center cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors px-1"
                >
                    <span className="font-semibold text-brownbold select-none text-xs md:text-sm truncate">
                        {selectedSort}
                    </span>
                    <Triangle 
                        size={10} 
                        fill="#4A3728" 
                        className={`text-brownbold shrink-0 transition-transform duration-250 ${isSort ? 'rotate-180' : ''}`} 
                    />
                </button>

                {/* Neobrutalist Dropdown Overlay */}
                {isSort && (
                    <div className="absolute top-[calc(100%+6px)] right-0 w-full bg-boldcream border-2 border-brownbold rounded-md shadow-[4px_4px_0px_0px_#4A3728] z-50 flex flex-col text-left py-1 text-xs md:text-sm animate-in fade-in slide-in-from-top-1 duration-150">
                        {sortOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setSelectedSort(option === "Default" ? "Sort By" : option);
                                    setIsSort(false);
                                }}
                                className={`w-full text-left px-3 py-2 font-bold text-brownbold hover:bg-[#4A3728] hover:text-[#EFEAD8] transition-colors duration-150 flex items-center justify-between ${
                                    (option === "Default" && selectedSort === "Sort By") || selectedSort === option ? 'bg-[#4A3728]/10' : ''
                                }`}
                            >
                                <span className="truncate">{option}</span>
                                {((option === "Default" && selectedSort === "Sort By") || selectedSort === option) && <Check size={14} className="shrink-0" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {showCreateForm && (
                <div 
                    onClick={handleNew} 
                    className={`bg-boldcream border-2 rounded-sm gap-2 border-brownbold neodesign flex items-center justify-center cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors ${showCreateForm ? "col-span-1" : "hidden"}`}
                >
                    <PencilLine size={18} className="text-brownbold" />
                    <p className="font-semibold text-brownbold select-none text-xs md:text-sm">
                        New
                    </p>
                </div>
            )}

            {isNew && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
                    <div 
                        className="bg-boldcream border-[3px] border-brownbold rounded-xl shadow-[8px_8px_0px_0px_#4A3728] max-w-lg w-full overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Banner */}
                        <div className="bg-[#4A3728] text-[#EFEAD8] px-6 py-4 flex justify-between items-center border-b-[3px] border-brownbold">
                            <h2 className="text-lg font-bold tracking-wide uppercase flex items-center gap-2">
                                <PencilLine className="w-5 h-5 text-[#FFDFB5]" />
                                Create New Task
                            </h2>
                            <button 
                                onClick={() => setIsNew(false)}
                                className="p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-[#EFEAD8]"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {formSuccess ? (
                            <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-[#FFDFB5] border-3 border-brownbold flex items-center justify-center shadow-[4px_4px_0px_0px_#4A3728] animate-bounce">
                                    <Check className="w-8 h-8 text-[#4A3728] stroke-3" />
                                </div>
                                <h3 className="text-xl font-extrabold text-brownbold tracking-tight">
                                    Task Created Successfully!
                                </h3>
                                <p className="text-sm font-medium text-brownbold/80 max-w-[280px]">
                                    Your new todo task has been saved and will sync with your list database.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
                                {formError && (
                                    <div className="bg-red-100 border-2 border-red-800 text-red-800 px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold text-xs">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <span>{formError}</span>
                                    </div>
                                )}

                                {/* Title Input */}
                                <div className="space-y-1.5 text-left">
                                    <label htmlFor="title" className="text-xs uppercase font-extrabold text-brownbold block">
                                        Task Title <span className="text-red-600">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="title"
                                        placeholder="e.g. Study Database Design Concepts"
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        className="w-full px-3.5 py-2 bg-background-cream border-2 border-brownbold rounded-lg text-brownbold font-semibold outline-none focus:ring-2 focus:ring-[#4A3728] placeholder-brownbold/40 text-sm"
                                        autoFocus
                                    />
                                </div>

                                {/* Description Input */}
                                <div className="space-y-1.5 text-left">
                                    <label htmlFor="desc" className="text-xs uppercase font-extrabold text-brownbold block">
                                        Description
                                    </label>
                                    <textarea 
                                        id="desc"
                                        rows={3}
                                        placeholder="Write some details or steps to complete..."
                                        value={taskDesc}
                                        onChange={(e) => setTaskDesc(e.target.value)}
                                        className="w-full px-3.5 py-2 bg-background-cream border-2 border-brownbold rounded-lg text-brownbold font-medium outline-none focus:ring-2 focus:ring-[#4A3728] placeholder-brownbold/40 text-sm resize-none"
                                    />
                                </div>

                                {/* Priority Chunky Buttons */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs uppercase font-extrabold text-brownbold block">
                                        Task Priority
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {/* High Button */}
                                        <button
                                            type="button"
                                            onClick={() => setTaskPriority("high")}
                                            className={`py-2 px-3 border-2 border-brownbold rounded-lg font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                                taskPriority === "high"
                                                    ? "bg-[#EA4335] text-white shadow-[2px_2px_0px_0px_#4A3728] translate-x-px translate-y-px"
                                                    : "bg-[#EA4335]/15 text-[#EA4335] hover:bg-[#EA4335]/25"
                                            }`}
                                        >
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black shrink-0" />
                                            HIGH
                                        </button>

                                        {/* Medium Button */}
                                        <button
                                            type="button"
                                            onClick={() => setTaskPriority("medium")}
                                            className={`py-2 px-3 border-2 border-brownbold rounded-lg font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                                taskPriority === "medium"
                                                    ? "bg-[#FBBC05] text-brownbold shadow-[2px_2px_0px_0px_#4A3728] translate-x-px translate-y-px"
                                                    : "bg-[#FBBC05]/15 text-[#b08402] hover:bg-[#FBBC05]/25"
                                            }`}
                                        >
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black shrink-0" />
                                            MEDIUM
                                        </button>

                                        {/* Low Button */}
                                        <button
                                            type="button"
                                            onClick={() => setTaskPriority("low")}
                                            className={`py-2 px-3 border-2 border-brownbold rounded-lg font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                                taskPriority === "low"
                                                    ? "bg-[#34A853] text-white shadow-[2px_2px_0px_0px_#4A3728] translate-x-px translate-y-px"
                                                    : "bg-[#34A853]/15 text-[#34A853] hover:bg-[#34A853]/25"
                                            }`}
                                        >
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-600 border border-black shrink-0" />
                                            LOW
                                        </button>
                                    </div>
                                </div>

                                {/* Category & Due Date Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Category Select */}
                                    <div className="space-y-1.5 text-left">
                                        <label htmlFor="category" className="text-xs uppercase font-extrabold text-brownbold flex items-center gap-1">
                                            <Tag size={13} />
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            value={taskCategory}
                                            onChange={(e) => setTaskCategory(e.target.value)}
                                            className="w-full px-3.5 py-2 bg-background-cream border-2 border-brownbold rounded-lg text-brownbold font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-[#4A3728]"
                                        >
                                            {types.filter(t => t !== "All").map((c) => (
                                                <option key={c} value={c} className="font-bold text-brownbold bg-boldcream">
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5 text-left">
                                        <label htmlFor="dueDate" className="text-xs uppercase font-extrabold text-brownbold flex items-center gap-1">
                                            <Calendar size={13} />
                                            Due Date
                                        </label>
                                        <input
                                            type="date"
                                            id="dueDate"
                                            value={taskDueDate}
                                            onChange={(e) => setTaskDueDate(e.target.value)}
                                            className="w-full px-3 py-1.5 bg-background-cream border-2 border-brownbold rounded-lg text-brownbold font-bold text-sm outline-none focus:ring-2 focus:ring-[#4A3728] cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Form Action Buttons */}
                                <div className="flex items-center justify-end gap-3 pt-3 border-t border-brownbold/15">
                                    <button
                                        type="button"
                                        onClick={() => setIsNew(false)}
                                        className="px-5 py-2 bg-transparent text-brownbold font-bold text-sm rounded-lg border-2 border-brownbold hover:bg-brownbold/5 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-brownbold text-[#EFEAD8] font-bold text-sm rounded-lg border-2 border-brownbold shadow-[4px_4px_0px_0px_#644a40] hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_0px_#644a40] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-[#EFEAD8] border-t-transparent rounded-full animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Save Task"
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}