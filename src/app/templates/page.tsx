import {
  Search,
} from "lucide-react";

const dataTemplate = [
  {
    category: "College",
    title: "Coursework",
    requirements: ["Task description", "Deadline date", "Priority level"],
  },
  {
    category: "Productivity",
    title: "Daily Planner",
    requirements: ["Task list", "Time schedule", "Priority level"],
  },
  {
    category: "Work",
    title: "Project Tracker",
    requirements: ["Project name", "Description", "Deadline date"],
  },
  {
    category: "Personal",
    title: "Habit Tracker",
    requirements: ["Habit name", "Frequency", "Status"],
  },
  {
    category: "College",
    title: "Finance",
    requirements: ["Expense name", "Ammount", "Date"],
  },
]

export default function Templates() {
  return (
    <main className="p-4 md:p-8 lg:p-15 w-full min-h-full">
      <h1 className="font-semibold text-xl mt-10 md:mt-10">
        Template Gallery
      </h1>
      <div className="w-full grid grid-cols-11 gap-2">
        <div className="col-span-8 bg-boldcream border-3 border-brownbold rounded-md px-4 h-9 flex items-center justify-center">
          <div className="flex items-center gap-2 w-full justify-center">
            <Search className="w-4 h-4 text-brownbold shrink-0" />
            <input 
              type="search" 
              placeholder="Search"
              className="w-full bg-transparent text-center text-brownbold placeholder:text-brownbold/60 font-medium text-sm outline-none border-none"
            />
          </div>
        </div>
        <div className="col-span-3 bg-boldcream border-3 border-brownbold rounded-md">
          <h1>World</h1>
        </div>
      </div>
    </main>
  );
}
