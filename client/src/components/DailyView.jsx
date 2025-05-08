import React from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { useCalendar } from "../context/CalendarContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";
import { PiSparkleFill } from "react-icons/pi";
import mockEvents from "../data/mockEvents.json";

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
    createdBy: event.creator,
  };
}

const parsedEvents = mockEvents.map(parseEvent);

const DailyView = () => {
  const { selectedDate, setSelectedDate } = useCalendar();

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const dailyEvents = parsedEvents.filter((event) =>
    isSameDay(new Date(event.start), selectedDate)
  );

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
        <button className="px-4 py-2 rounded-full font-semibold text-pink-600 bg-pink-100 shadow-sm">
          Daily
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-gray-500 hover:text-pink-600">
          Weekly
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-gray-500 hover:text-pink-600">
          Monthly
        </button>
      </div> */}

      {/* Week Day Selector */}
      <div className="flex justify-between bg-white rounded-xl overflow-hidden shadow mb-8">
        {weekDays.map((day, index) => (
          <div
            key={index}
            onClick={() => setSelectedDate(day)}
            className={`w-full text-center py-3 cursor-pointer relative transition-all font-semibold text-gray-700 ${
              isSameDay(day, selectedDate)
                ? "bg-pink-100 text-pink-600 ring-2 ring-pink-300 z-10"
                : "hover:bg-orange-50"
            }`}
          >
            <div className="text-xs uppercase tracking-wide">
              {format(day, "EEE")}
            </div>
            <div className="text-lg flex flex-col items-center font-bold">
              {format(day, "d")}
              {isSameDay(day, selectedDate) && (
                <span className="w-2 h-2 bg-pink-400 rounded-full mt-1"></span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Event Cards */}
      <div className="space-y-6">
        {dailyEvents.map((event, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-2xl shadow-lg flex flex-col gap-2 relative border border-pink-50 hover:scale-[1.02] transition-transform"
          >
            {/* Three-dot menu */}
            <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
              <BsThreeDotsVertical size={22} />
            </div>
            {/* Time */}
            <div className="text-xs text-gray-500 font-medium">
              {format(new Date(event.start), "p")} -{" "}
              {format(new Date(event.end), "p")}
            </div>
            {/* Title with icon */}
            <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              <span className="text-2xl">{event.icon}</span>
              {event.title}
            </div>
            {/* Creator */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <PiSparkleFill className="text-yellow-400" />
              {event.createdBy}
            </div>
          </div>
        ))}
        {dailyEvents.length === 0 && (
          <p className="text-base text-gray-400 text-center mt-10">
            No events for this day.
          </p>
        )}
      </div>
    </div>
  );
};

export default DailyView;
