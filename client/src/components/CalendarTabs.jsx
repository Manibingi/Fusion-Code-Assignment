import React from "react";

export default function CalendarTabs({ view, setView }) {
  const tabs = ["Daily", "Weekly", "Monthly"];
  return (
    <div className="flex space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-full border transition-all duration-200 ${
            view === tab
              ? "bg-black text-white"
              : "bg-white text-black border-black"
          }`}
          onClick={() => setView(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
