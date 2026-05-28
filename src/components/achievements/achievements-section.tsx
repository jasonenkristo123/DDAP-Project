import Image from "next/image";
import SearchSection from "../shared/search-section";

const types = ["Easy", "Medium", "Hard"];
const sortOptions = [
    "Easy -> Hard",
    "Hard -> Easy",
];

const dataAchievements = [
    {
        images: "/yuji.webp",
        title: "The First Step",
        desc: "Successfully completed your first ToDo task",
        completed: "Completed on February 2, 2026",
        difficulty: "Easy"
    },
    {
        images: "/gojo.webp",
        title: "The Sole Exception of Gojo Satoru of Course",
        desc: "Completed 25 tasks in total",
        completed: "Completed on February 2, 2026",
        difficulty: "Medium"
    },
    {
        images: "/sukuna.webp",
        title: "Centuary",
        desc: "Completed 100 tasks in total",
        completed: "Completed on February 2, 2026",
        difficulty: "Hard"
    },
    
]

export default function AchievementsSection() {



    return (
        <div className="w-full p-4 md:p-8 lg:p-15  ">
            <SearchSection types={types} sortOptions={sortOptions} showCreateForm={false} />
            {
                dataAchievements.map((data, index) => (
                    <div key={index} className="mt-6">
                        <div className="bg-black w-full h-[2px]" />
                        <div className="flex items-center gap-6 mt-4">
                            <div className="relative border border-brownbold rounded-full w-16 h-16 overflow-hidden">
                                <Image src={data.images} alt={data.title} fill className="object-cover" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl">
                                        {data.title}
                                    </h1>
                                    <div className={`border-2 border-brownbold ${data.difficulty.toLowerCase() === "hard" ? "bg-red-500" : data.difficulty.toLowerCase() === "medium" ? "bg-yellow-300" : "bg-green-500"} px-3 py-0.5 rounded-full`}>
                                        <p className="text-xs">
                                            {data.difficulty}
                                        </p>
                                    </div>
                                </div>

                                <h2 className="font-semibold mt-1">
                                    {data.desc}
                                </h2>
                                <p className="mt-2 font-semibold text-brownbold">
                                    {data.completed}
                                </p>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}