import { useState } from "react";
import { useCalendar } from "../context/CalendarContext";

export default function EventModal({ selectedDate, onClose }) {
  const { createEvent, isLoading, error } = useCalendar();
  const [validationErrors, setValidationErrors] = useState({});
  const [eventData, setEventData] = useState({
    title: "",
    date: selectedDate
      ? new Date(selectedDate).toISOString().split("T")[0]
      : "",
    time: "",
    location: "",
    description: "",
    icon: "",
    creator: "User", // This should be replaced with actual user info in a real app
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for the field being changed
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      await createEvent(eventData);
      onClose();
    } catch (err) {
      if (err.response?.data?.details) {
        // Handle validation errors from backend
        setValidationErrors(err.response.data.details);
      } else {
        console.error("Failed to create event:", err);
      }
    }
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] || null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        {error && !Object.keys(validationErrors).length && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="title"
              onChange={handleChange}
              value={eventData.title}
              placeholder="Event Title"
              className={`w-full p-2 border rounded ${
                getFieldError("title") ? "border-red-500" : ""
              }`}
              required
            />
            {getFieldError("title") && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError("title")}
              </p>
            )}
          </div>
          <div>
            <input
              name="date"
              onChange={handleChange}
              value={eventData.date}
              type="date"
              className={`w-full p-2 border rounded ${
                getFieldError("date") ? "border-red-500" : ""
              }`}
              required
            />
            {getFieldError("date") && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError("date")}
              </p>
            )}
          </div>
          <div>
            <input
              name="time"
              onChange={handleChange}
              value={eventData.time}
              type="time"
              className={`w-full p-2 border rounded ${
                getFieldError("time") ? "border-red-500" : ""
              }`}
              required
            />
            {getFieldError("time") && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError("time")}
              </p>
            )}
          </div>
          <div>
            <input
              name="location"
              onChange={handleChange}
              value={eventData.location}
              placeholder="Location"
              className={`w-full p-2 border rounded ${
                getFieldError("location") ? "border-red-500" : ""
              }`}
            />
            {getFieldError("location") && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError("location")}
              </p>
            )}
          </div>
          <div>
            <textarea
              name="description"
              onChange={handleChange}
              value={eventData.description}
              placeholder="Description"
              className={`w-full p-2 border rounded ${
                getFieldError("description") ? "border-red-500" : ""
              }`}
            />
            {getFieldError("description") && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError("description")}
              </p>
            )}
          </div>
          <div>
            <select
              name="icon"
              onChange={handleChange}
              value={eventData.icon}
              className={`w-full p-2 border rounded ${
                getFieldError("icon") ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Icon</option>
              <option value="🎉">🎉 Party</option>
              <option value="📅">📅 Meeting</option>
              <option value="📞">📞 Call</option>
              <option value="🏖️">🏖️ Holiday</option>
            </select>
            {getFieldError("icon") && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError("icon")}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
