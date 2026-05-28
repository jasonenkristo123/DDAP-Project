"use client"
import { ArrowRight, SquareCheckBig, SquarePlus } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { dataPinned } from "@/data/todos";

const barChartTodos = [
  {
    month: "Januari",
    totalTodos: 5,
  },
  {
    month: "Februari",
    totalTodos: 2,
  },
  {
    month: "Maret",
    totalTodos: 8,
  },
  {
    month: "April",
    totalTodos: 4,
  },
  {
    month: "Mei",
    totalTodos: 13,
  },
  {
    month: "Juni",
    totalTodos: 12,
  },
  {
    month: "Juli",
    totalTodos: 9,
  },
  {
    month: "Agustus",
    totalTodos: 10,
  },
  {
    month: "September",
    totalTodos: 9,
  },
  {
    month: "Oktober",
    totalTodos: 10,
  },
  {
    month: "November",
    totalTodos: 11,
  },
  {
    month: "Desember",
    totalTodos: 12,
  },
]

const dataContributionCreate = [
  {
    title: "Tugas DDAP Tentang Website",
    priority: "high",
    date: "20 March",
    daysleft: 1
  },
  {
    title: "Tugas Aljabar Linear",
    priority: "medium",
    date: "03 April",
    daysleft: 3
  },
  {
    title: "Tugas Desain Database",
    priority: "low",
    date: "10 April",
    daysleft: 7
  }
]

const dataContributionComplete = [
  {
    title: "Tugas Peta Konsep Bahasa Indonesia",
    date: "16 March",
    priority: "completed"
  }
]

export default function Home() {
  return (
    <main className="p-4 md:p-8 lg:p-15 w-full min-h-full">
      <h1 className="text-xl font-semibold mt-10 md:mt-10">
        Pinned
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mt-4">
        {dataPinned.map((data, index) => (
          <div
            key={index}
            className="bg-boldcream border-[3px] border-brownbold p-6 rounded-xl space-y-3 w-full neodesign"
          >
            <h2 className="text-brownbold font-bold text-xl md:text-2xl tracking-tight">
              {data.title}
            </h2>
            <p className="truncate text-brownbold/80 text-sm md:text-base font-medium">
              {data.desc}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border-2 border-brownbold bg-background-cream text-brownbold shadow-[2px_2px_0px_0px_#644a40]">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${data.priority.toLowerCase() === "high" ? "bg-red-600" : "bg-orange-500"}`} />
                  <span className="capitalize">{data.priority}</span>
                </span>

                <div className="flex items-center gap-1.5 text-brownbold/75 text-xs md:text-sm font-semibold">
                  <span>{data.dateCreate}</span>
                  <ArrowRight className="w-4 h-4 text-brownbold/70 shrink-0" />
                  <span>{data.dateDone}</span>
                </div>
              </div>

              <button className="bg-background-cream text-brownbold font-bold text-xs px-3.5 py-1.5 rounded-lg border-2 border-brownbold shadow-[2px_2px_0px_0px_#644a40] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_#644a40] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer">
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:max-w-[82%] flex justify-between items-center mt-10 md:mt-20">
        <h2 className="text-lg md:text-xl font-medium">
          1000 todos last year
        </h2>
        <h3 className="text-xs md:text-sm">
          Contribution Settings
        </h3>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4 md:gap-6 mt-2">
        <div className="bg-boldcream border-2 border-brownbold rounded-lg w-full sm:max-w-[85%] p-2 min-h-[120px] md:min-h-0 neodesign">
          <Bar
            data={{
              labels: barChartTodos.map((data) => data.month),
              datasets: [{
                label: "Total Todos",
                data: barChartTodos.map((data) => data.totalTodos),
                backgroundColor: "#644a40",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false,
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: "#ffdfb5",
                  titleColor: "#4A3728",
                  bodyColor: "#4A3728",
                  borderColor: "#4A3728",
                  borderWidth: 1,
                  cornerRadius: 8,
                  padding: 5,
                  titleFont: { weight: "bold" },
                },
              },
              scales: {
                y: {
                  display: false,
                },
                x: {
                  display: false,
                }
              }
            }}
          />
        </div>

        <div className="bg-boldcream border-2 border-brownbold w-full sm:max-w-[15%] h-8 rounded-md flex items-center justify-center text-brownbold font-semibold text-sm shadow-[6px_6px_0px_0px_#644a40] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#644a40] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px_#644a40] transition-all duration-200">
          2026
        </div>
      </div>

      <h2 className="text-lg md:text-xl font-medium mt-14 md:mt-30">
        Contribution Activity
      </h2>

      <div className="flex items-center gap-4 lg:max-w-[85%] mt-6 md:mt-10 pl-0 md:pl-10">
        <div className="flex gap-3 shrink-0">
          <h3 className="text-lg md:text-xl">
            March
          </h3>
          <p className="text-lg md:text-xl">
            2026
          </p>

        </div>
        <div className="w-full bg-black h-px" />
      </div>

      <div className="w-full mt-2 flex gap-4 md:gap-6">
        {/* Timeline line — hidden on mobile for cleaner look */}
        <div className="hidden md:block ml-[8%]">
          <div className="w-px bg-black h-[400px] relative">
            <div className="absolute bg-boldcream rounded-full p-1 z-10 top-10 left-1/2 -translate-x-1/2">
              <SquarePlus />
            </div>
            <div className="absolute bg-boldcream rounded-full p-1 z-10 top-[50%] left-1/2 -translate-x-1/2">
              <SquareCheckBig />
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-10 w-full min-w-0">
          <div className="flex items-center gap-2 md:hidden">
            <SquarePlus className="w-5 h-5 shrink-0" />
            <h3 className="text-lg font-medium">
              Created 40 Todo List
            </h3>
          </div>
          <h3 className="text-xl hidden md:block">
            Created 40 Todo List
          </h3>
          {
            dataContributionCreate.map((data, index) => (
              <div key={index} className="flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_13%_40%_18%] xl:grid-cols-[1fr_13%_40%_10%] max-w-[85%] w-full items-start sm:items-center sm:gap-4 space-y-3">
                <h4 className="text-bluebold md:truncate text-base md:text-lg wrap-break-words">
                  {data.title}
                </h4>
                <p className="text-xs md:text-sm text-black/60 sm:text-black">
                  {data.date}
                </p>
                <div className={`rounded-full h-2 sm:h-3 w-full ${data.priority === "high" ? "bg-red-600" : data.priority === "medium" ? "bg-orange-400" : "bg-green-600"}`} />
                <p className="text-xs md:text-sm">
                  {data.daysleft} <span>{data.daysleft > 1 ? "days left" : "day left"}</span>
                </p>
              </div>
            ))
          }

          <div className="w-full lg:max-w-[85%] mt-8 md:mt-13 space-y-4">
            <div className="flex items-center gap-2 md:hidden">
              <SquareCheckBig className="w-5 h-5 shrink-0" />
              <h3 className="text-lg font-medium">
                Complete 5 Todo List
              </h3>
            </div>
            <h3 className="text-xl hidden md:block">
              Complete 5 Todo List
            </h3>
            {
              dataContributionComplete.map((data, index) => (
                <div key={index} className="flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_20%_2fr] xl:grid-cols-[1fr_10%_2fr] 2xl: w-full md:max-w-[85%] xl:max-w-full items-start sm:items-center">
                  <h4 className="text-bluebold max-w-[250px] text-base md:truncate md:text-lg wrap-break-words">
                    {data.title}
                  </h4>
                  <p className="text-xs md:text-sm text-black/60 sm:text-black">
                    {data.date}
                  </p>
                  <div className="rounded-full h-2 sm:h-3 w-full bg-blue-300" />
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="w-full lg:max-w-[80%] bg-boldcream rounded-lg flex items-center justify-center p-2 lg:ml-[10%] border-2 border-brownbold mt-6 shadow-[6px_6px_0px_0px_#644a40] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#644a40] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px_#644a40] transition-all duration-200 cursor-pointer">
        <h5 className="text-brownbold text-sm md:text-base">
          Show more todos
        </h5>

      </div>

    </main>
  );
}
