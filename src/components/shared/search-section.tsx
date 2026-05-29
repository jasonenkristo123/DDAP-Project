"use client";
import { Search, Triangle, PencilLine, X, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchSectionProps {
  types?: string[];
  sortOptions?: string[];
  showCreateForm?: boolean;
  showFilters?: boolean;
  buttonText?: string;
  onNewClick: () => void;
}

export default function SearchSection({
  types = [],
  sortOptions = [],
  showCreateForm = true,
  showFilters = true,
  buttonText = "New",
  onNewClick,
}: SearchSectionProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isSort, setIsSort] = useState(false);

  const [selectedType, setSelectedType] = useState("Type");
  const [selectedSort, setSelectedSort] = useState("Sort By");

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    setIsSearching(!isSearching);
    setIsType(false);
    setIsSort(false);
  };

  const handleType = () => {
    setIsType(!isType);
    setIsSearching(false);
    setIsSort(false);
  };

  const handleSort = () => {
    setIsSort(!isSort);
    setIsSearching(false);
    setIsType(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
        setIsType(false);
        setIsSort(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const gridConfig = !showFilters
    ? "grid-cols-4 w-full"
    : showCreateForm
      ? "grid-cols-4 md:grid-cols-7"
      : "grid-cols-4 md:grid-cols-8";

  return (
    <div ref={searchRef} className={`grid ${gridConfig} gap-3 relative w-full`}>
      {/* SEARCH BOX */}
      {isSearching ? (
        <div
          className={`bg-boldcream border-2 rounded-sm gap-2 border-brownbold flex items-center justify-center neodesign relative h-10 px-2 ${showFilters ? "col-span-4" : "col-span-3"}`}
        >
          <input
            type="text"
            placeholder="Search..."
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
          className={`bg-boldcream border-2 rounded-sm gap-2 border-brownbold flex items-center justify-center neodesign cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors ${showFilters ? "col-span-4" : "col-span-3"}`}
        >
          <Search size={20} className="text-brownbold" />
          <p className="font-semibold text-brownbold select-none text-sm md:text-base">
            Search
          </p>
        </div>
      )}

      {/* FILTERS SECTION */}
      {showFilters && (
        <>
          {/* Type Dropdown */}
          <div
            className={`relative col-span-1 ${showCreateForm ? "md:col-span-1" : " col-span-2 md:col-span-2"} `}
          >
            <button
              onClick={handleType}
              className="w-full bg-boldcream border-2 rounded-sm gap-1.5 border-brownbold neodesign flex items-center justify-center cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors px-1"
            >
              <span className="font-semibold text-brownbold select-none text-xs md:text-sm truncate">
                {selectedType}
              </span>
              <Triangle
                size={10}
                fill="#4A3728"
                className={`text-brownbold shrink-0 transition-transform duration-250 ${isType ? "rotate-180" : ""}`}
              />
            </button>
            {isType && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-boldcream border-2 border-brownbold rounded-md shadow-[4px_4px_0px_0px_#4A3728] z-50 flex flex-col text-left py-1 text-xs md:text-sm animate-in fade-in slide-in-from-top-1 duration-150">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type === "All" ? "Type" : type);
                      setIsType(false);
                    }}
                    className={`w-full text-left px-3 py-2 font-bold text-brownbold hover:bg-[#4A3728] hover:text-[#EFEAD8] transition-colors duration-150 flex items-center justify-between ${(type === "All" && selectedType === "Type") || selectedType === type ? "bg-[#4A3728]/10" : ""}`}
                  >
                    <span>{type}</span>
                    {((type === "All" && selectedType === "Type") ||
                      selectedType === type) && (
                      <Check size={14} className="shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div
            className={`relative col-span-2 ${showCreateForm ? "md:col-span-1" : "md:col-span-2"}`}
          >
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
                className={`text-brownbold shrink-0 transition-transform duration-250 ${isSort ? "rotate-180" : ""}`}
              />
            </button>
            {isSort && (
              <div className="absolute top-[calc(100%+6px)] right-0 w-full bg-boldcream border-2 border-brownbold rounded-md shadow-[4px_4px_0px_0px_#4A3728] z-50 flex flex-col text-left py-1 text-xs md:text-sm animate-in fade-in slide-in-from-top-1 duration-150">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedSort(
                        option === "Default" ? "Sort By" : option,
                      );
                      setIsSort(false);
                    }}
                    className={`w-full text-left px-3 py-2 font-bold text-brownbold hover:bg-[#4A3728] hover:text-[#EFEAD8] transition-colors duration-150 flex items-center justify-between ${(option === "Default" && selectedSort === "Sort By") || selectedSort === option ? "bg-[#4A3728]/10" : ""}`}
                  >
                    <span className="truncate">{option}</span>
                    {((option === "Default" && selectedSort === "Sort By") ||
                      selectedSort === option) && (
                      <Check size={14} className="shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* CREATE NEW BUTTON */}
      {showCreateForm && (
        <div
          onClick={onNewClick}
          className="bg-boldcream border-2 rounded-sm gap-2 border-brownbold neodesign flex items-center justify-center cursor-pointer h-10 hover:bg-[#F5F2EB] transition-colors col-span-1"
        >
          <PencilLine size={18} className="text-brownbold" />
          <p className="font-semibold text-brownbold select-none text-xs md:text-sm">
            {buttonText === "New Template" ? (
              <>
                New<span className="hidden sm:inline"> Template</span>
              </>
            ) : (
              buttonText
            )}
          </p>
        </div>
      )}
    </div>
  );
}
