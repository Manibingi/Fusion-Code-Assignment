import React, { useState } from "react";
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns";
import { useCalendar } from "../context/CalendarContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";
import { PiSparkleFill } from "react-icons/pi";
import EventModal from "./EventModal";

const DailyView = () => {
  const { selectedDate, setSelectedDate, events } = useCalendar();
  const [showEventModal, setShowEventModal] = useState(false);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Get events for the selected day
  const dailyEvents = events
    .filter((event) => isSameDay(parseISO(event.date), selectedDate))
    .sort((a, b) => {
      // Sort events by time
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

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

      {/* Selected Date Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-700">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </h3>
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {dailyEvents.length > 0 ? (
          dailyEvents.map((event) => (
            <div
              key={event._id}
              className="bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-2xl shadow-lg border border-pink-50 hover:scale-[1.02] transition-transform"
            >
              {/* Three-dot menu */}
              <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
                <BsThreeDotsVertical size={22} />
              </div>

              {/* Time and Icon */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{event.icon}</span>
                <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                  {event.time}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>

              {/* Location */}
              {event.location && (
                <div className="text-sm text-gray-600 mb-2">
                  📍 {event.location}
                </div>
              )}

              {/* Description */}
              {event.description && (
                <p className="text-gray-600 text-sm mb-3">
                  {event.description}
                </p>
              )}

              {/* Creator */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <PiSparkleFill className="text-yellow-400" />
                <span>Created by {event.creator}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">
              No events scheduled for this day
            </p>
          </div>
        )}
      </div>

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

export default DailyView;
