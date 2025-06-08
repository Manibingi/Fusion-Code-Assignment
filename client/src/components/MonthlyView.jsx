import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { useCalendar } from "../context/CalendarContext";
import EventModal from "./EventModal";

const MonthlyView = () => {
  const { selectedDate, setSelectedDate, events } = useCalendar();
  const [showEventModal, setShowEventModal] = useState(false);

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;

  const getEventsForDay = (day) =>
    events.filter((event) => isSameDay(new Date(event.date), day));

  const handlePrevMonth = () => setSelectedDate(subMonths(selectedDate, 1));
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const isToday = isSameDay(cloneDay, selectedDate);
      const isInMonth = isSameMonth(cloneDay, monthStart);
      const dayEvents = getEventsForDay(cloneDay);

      days.push(
        <div
          key={cloneDay}
          className={`group p-2 text-center cursor-pointer rounded-xl border transition-all duration-150 min-h-[70px] flex flex-col items-center justify-between shadow-sm
            ${
              isToday
                ? "bg-pink-100 border-pink-400 font-bold ring-2 ring-pink-300"
                : ""
            }
            ${
              !isInMonth
                ? "text-gray-300 bg-gray-50"
                : "bg-white hover:bg-orange-50"
            }
          `}
          onClick={() => setSelectedDate(cloneDay)}
        >
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full mb-1 ${
              isToday ? "bg-pink-400 text-white" : ""
            }`}
          >
            {format(cloneDay, dateFormat)}
          </div>
          <div className="flex justify-center gap-1 mt-1 flex-wrap min-h-[18px]">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <span
                key={event._id || idx}
                title={event.title}
                className="text-lg group-hover:scale-110 transition-transform duration-150"
              >
                {event.icon}
              </span>
            ))}
            {dayEvents.length > 3 && (
              <span className="text-xs text-gray-400">
                +{dayEvents.length - 3}
              </span>
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }

    rows.push(
      <div className="grid grid-cols-7 gap-3" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl shadow-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Calendar
        </h2>
        <button
          onClick={() => setShowEventModal(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-150"
        >
          + New event
        </button>
      </div>

      {/* View Controls */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-pink-100 text-xl font-bold transition-all"
          onClick={handlePrevMonth}
          aria-label="Previous Month"
        >
          ←
        </button>
        <h3 className="text-2xl font-bold text-gray-700 mx-4">
          {format(monthStart, "MMMM yyyy")}
        </h3>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-pink-100 text-xl font-bold transition-all"
          onClick={handleNextMonth}
          aria-label="Next Month"
        >
          →
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-base font-semibold text-pink-500 mb-3 bg-pink-50 rounded-xl py-2 shadow-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Month Grid */}
      <div className="space-y-3">{rows}</div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
};

export default MonthlyView;
