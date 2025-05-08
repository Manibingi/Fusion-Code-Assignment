import React from "react";
import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
  addWeeks,
  subWeeks,
} from "date-fns";
import { useCalendar } from "../context/CalendarContext";
import mockEvents from "../data/mockEvents.json";

const hours = Array.from({ length: 24 }, (_, i) => i); // 0 - 23

// Helper to parse time range (e.g., "8:00 AM - 4:00 PM") into start/end Date objects
function parseEvent(event) {
  const [startTime, endTime] = event.time.split(" - ");
  const dateStr = event.date;
  const start = new Date(`${dateStr} ${startTime}`);
  // If end time is earlier than start, assume it's next day (overnight event)
  let end = new Date(`${dateStr} ${endTime}`);
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }
  return {
    ...event,
    start,
    end,
    owner: event.creator,
  };
}

const parsedEvents = mockEvents.map(parseEvent);

const WeeklyView = () => {
  const { selectedDate, setSelectedDate } = useCalendar();
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handlePrevWeek = () => setSelectedDate(subWeeks(selectedDate, 1));
  const handleNextWeek = () => setSelectedDate(addWeeks(selectedDate, 1));

  const getEventsForSlot = (day, hour) =>
    parsedEvents.filter((event) => {
      const start = new Date(event.start);
      return isSameDay(start, day) && start.getHours() === hour;
    });

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl shadow-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Calendar
        </h2>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-150">
          + New event
        </button>
      </div>

      {/* Tabs */}
      {/* <div className="flex gap-4 mb-6 justify-center">
        <button className="px-4 py-2 rounded-full font-semibold text-gray-500 hover:text-pink-600">
          Daily
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-pink-600 bg-pink-100 shadow-sm">
          Weekly
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-gray-500 hover:text-pink-600">
          Monthly
        </button>
      </div> */}

      {/* Navigation */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-pink-100 text-xl font-bold transition-all"
          onClick={handlePrevWeek}
          aria-label="Previous Week"
        >
          ←
        </button>
        <h3 className="text-2xl font-bold text-gray-700 mx-4">
          Week of {format(weekStart, "MMM d, yyyy")}
        </h3>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-pink-100 text-xl font-bold transition-all"
          onClick={handleNextWeek}
          aria-label="Next Week"
        >
          →
        </button>
      </div>

      {/* Day Header */}
      <div className="grid grid-cols-8 text-center text-base font-semibold text-pink-500 mb-3 bg-pink-50 rounded-xl py-2 shadow-sm">
        <div className="border-r-2 border-pink-100">Time</div>
        {days.map((day) => (
          <div
            key={day}
            className={`py-2 border-r-2 border-pink-100 cursor-pointer rounded-lg mx-1 transition-all duration-150 ${
              isSameDay(day, selectedDate)
                ? "bg-pink-100 text-pink-600 font-bold ring-2 ring-pink-300"
                : "hover:bg-orange-50 text-gray-700"
            }`}
            onClick={() => setSelectedDate(day)}
          >
            {format(day, "EEE dd")}
          </div>
        ))}
      </div>

      {/* Time slots */}
      <div className="rounded-xl bg-white shadow-inner overflow-hidden">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-8 border-b border-pink-50 text-sm h-16"
          >
            <div className="text-right pr-2 pt-3 border-r-2 border-pink-50 text-gray-400 font-semibold bg-pink-50">{`${
              hour % 12 || 12
            }${hour < 12 ? "AM" : "PM"}`}</div>
            {days.map((day) => (
              <div
                key={day}
                className="border-r-2 border-pink-50 relative px-1"
              >
                {getEventsForSlot(day, hour).map((event, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1 left-1 right-1 bg-gradient-to-r from-pink-100 to-orange-100 p-2 rounded-lg text-xs shadow-lg border border-pink-50 flex flex-col items-start gap-1 hover:scale-[1.03] transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{event.icon}</span>
                      <span className="truncate font-semibold text-gray-800">
                        {event.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {event.owner}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyView;
