"use client";
import { dataPinned } from "@/data/todos";
import SearchSection from "../shared/search-section";
import TodoItem from "./TodoItem";




export default function TodosPage() {
    return (
        <div className="p-4 md:p-8 lg:p-15 w-full">
            <SearchSection />
            <div className="mt-10">
                {
                    dataPinned.map((data, index) => (
                        <TodoItem key={index} data={data} />
                    ))
                }
            </div>
        </div>
    );
}