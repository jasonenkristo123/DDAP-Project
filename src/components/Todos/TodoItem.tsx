"use client"
import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";

interface TodoData {
    title: string;
    desc: string;
    priority: string;
    dateCreate: string;
    dateDone: string;
    progress: string;
}

export default function TodoItem({ data }: { data: TodoData }) {
    const [isPinned, setIsPinned] = useState(false);

    const handlePinned = () => {
        setIsPinned(!isPinned);
    };

    return (
        <div className="w-full mt-3">
            <div className="w-full bg-black h-[2px]" />
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold">
                        {data.title}
                    </h1>
                    <div className="bg-gray-300 rounded-full px-2 font-semibold">
                        <p>
                            {data.progress}
                        </p>
                    </div>
                </div>
                <div onClick={handlePinned} className={`bg-boldcream border-2 border-brownbold max-w-[7%] w-full flex items-center justify-center gap-2 rounded-sm transition-all duration-200 cursor-pointer ${isPinned ? "translate-x-[4px] translate-y-[4px] shadow-[2px_2px_0px_0px_#644a40]" : "shadow-[6px_6px_0px_0px_#644a40] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px_#644a40]"}`}>
                    <Star fill="yellow" className="w-5 h-5" />
                    <p className="font-bold">
                        Pin
                    </p>
                </div>
            </div>
            <h2 className="text-xl font-light font-sans">
                {data.desc}
            </h2>
            <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className={`${data.priority.toLowerCase() === "high" ? "bg-red-500" : data.priority.toLowerCase() === "medium" ? "bg-orange-400" : data.priority.toLowerCase() === "low" ? "bg-green-500" : "bg-blue-500"} w-3 h-3 rounded-full `} />
                    <p className="capitalize font-medium">
                        {data.priority}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <p>
                        {data.dateCreate}
                    </p>
                    <ArrowRight size={17} />
                    <p>
                        {data.dateDone}
                    </p>
                </div>
            </div>
        </div>
    );
}