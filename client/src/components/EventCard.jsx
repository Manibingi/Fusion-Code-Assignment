import React from "react";
import { cn } from "../utils/classnames"; // optional utility for combining class names

const EventCard = ({ event }) => {
  const {
    icon,
    title,
    time,
    user,
    color = "from-pink-100 to-orange-100",
  } = event;

  return (
    <div
      className={cn("rounded-xl p-4 mb-3 shadow-sm", "bg-gradient-to-r", color)}
    >
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium mb-1">
        <span>{icon}</span>
        <span>{time}</span>
      </div>
      <h4 className="text-md font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500">{user}</p>
    </div>
  );
};

export default EventCard;
