"use client";

import Image from "next/image";
import SearchSection from "../shared/search-section";
import { useEffect, useState } from "react";
import { getAllAchievements } from "../api/achiementsApi";

const types = ["All", "Easy", "Medium", "Hard"];
const sortOptions = ["Default", "Easy -> Hard", "Hard -> Easy"];

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      let difficultyParam = type === "All" ? "" : type;
      let orderParam = "";
      if (sort === "Easy -> Hard") orderParam = "asc";
      if (sort === "Hard -> Easy") orderParam = "desc";

      const res = await getAllAchievements({
        search,
        difficulty: difficultyParam,
        order: orderParam,
      });
      setAchievements(res.data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [search, type, sort]);

  return (
    <div className="w-full p-4 md:p-8 lg:p-15">
      <SearchSection
        types={types}
        sortOptions={sortOptions}
        showCreateForm={false}
        onSearchChange={setSearch}
        onTypeChange={setType}
        onSortChange={setSort}
      />
      {loading ? (
        <div className="mt-6 flex justify-center">
          <p className="text-brownbold font-manrope-600">
            Loading achievements...
          </p>
        </div>
      ) : achievements.length === 0 ? (
        <div className="mt-6 flex justify-center">
          <p className="text-brownbold font-manrope-600">
            No achievements found.
          </p>
        </div>
      ) : (
        achievements.map((data, index) => (
          <div
            key={data.id_achievement || index}
            className={`mt-6 ${!data.is_unlocked ? "opacity-50" : ""}`}
          >
            <div className="bg-black w-full h-[2px]" />
            <div className="flex items-center gap-6 mt-4">
              <div className="relative border border-brownbold rounded-full w-16 h-16 overflow-hidden bg-gray-200 shrink-0">
                {data.icon_url && (
                  <Image
                    src={data.icon_url}
                    alt={data.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl font-manrope-700">{data.title}</h1>
                  <div
                    className={`border-2 border-brownbold ${data.difficulty?.toLowerCase() === "hard" ? "bg-red-500" : data.difficulty?.toLowerCase() === "medium" ? "bg-yellow-300" : "bg-green-500"} px-3 py-0.5 rounded-full`}
                  >
                    <p className="text-xs font-manrope-600">
                      {data.difficulty}
                    </p>
                  </div>
                  {!data.is_unlocked && (
                    <div className="border-2 border-brownbold bg-gray-300 px-3 py-0.5 rounded-full">
                      <p className="text-xs font-manrope-600 text-gray-700">
                        Locked
                      </p>
                    </div>
                  )}
                </div>

                <h2 className="mt-1 font-manrope-600">{data.description}</h2>
                <p className="mt-2 text-brownbold font-manrope-500">
                  {data.is_unlocked && data.completed_at
                    ? `Completed on ${new Date(data.completed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
                    : "Not completed yet"}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
