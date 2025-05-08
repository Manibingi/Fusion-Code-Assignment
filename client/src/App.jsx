import React, { useState } from "react";
import CalendarTabs from "./components/CalendarTabs";
import DailyView from "./components/DailyView";
import WeeklyView from "./components/WeeklyView";
import MonthlyView from "./components/MonthlyView";

export default function App() {
  const [view, setView] = useState("Monthly");

  return (
    <div className="min-h-screen bg-white p-4 font-sans">
      {/* <div className="text-3xl font-bold mb-4">Calendar</div> */}
      <CalendarTabs view={view} setView={setView} />
      {view === "Daily" && <DailyView />}
      {view === "Weekly" && <WeeklyView />}
      {view === "Monthly" && <MonthlyView />}
    </div>
  );
}
