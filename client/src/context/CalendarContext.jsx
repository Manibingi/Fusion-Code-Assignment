import React, { createContext, useContext, useState, useEffect } from "react";
import { eventService } from "../services/eventService";

const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await eventService.getEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      setIsLoading(true);
      const newEvent = await eventService.createEvent(eventData);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setError(null);
      return newEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      setIsLoading(true);
      const updatedEvent = await eventService.updateEvent(id, eventData);
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === id ? updatedEvent : event))
      );
      setError(null);
      return updatedEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setIsLoading(true);
      await eventService.deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    selectedDate,
    setSelectedDate,
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchEvents,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
