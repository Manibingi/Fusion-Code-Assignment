import axios from "axios";

const API_URL = "http://localhost:8000/api/events";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const eventService = {
  // Create a new event
  createEvent: async (eventData) => {
    const response = await api.post("/", eventData);
    return response.data;
  },

  // Get all events
  getEvents: async () => {
    const response = await api.get("/");
    return response.data;
  },

  // Get events by date range
  getEventsByDateRange: async (startDate, endDate) => {
    const response = await api.get("/range", {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Update an event
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/${id}`, eventData);
    return response.data;
  },

  // Delete an event
  deleteEvent: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};
