const express = require("express");
const Event = require("../models/eventModel.js");

const router = express.Router();

// Create Event
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    const { title, date, time } = req.body;
    if (!title || !date || !time) {
      return res.status(400).json({
        message: "Missing required fields",
        details: {
          title: !title ? "Title is required" : null,
          date: !date ? "Date is required" : null,
          time: !time ? "Time is required" : null,
        },
      });
    }

    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        message: "Validation failed",
        details: validationErrors,
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get Events by Month
router.get("/month", async (req, res) => {
  const { month, year } = req.query;
  try {
    const regex = new RegExp(`^${year}-${month.padStart(2, "0")}`);
    const events = await Event.find({ date: { $regex: regex } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Events by Day
router.get("/day", async (req, res) => {
  const { date } = req.query;
  try {
    const events = await Event.find({ date });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Events by Week
router.get("/week", async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const events = await Event.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
});

// Get events by date range
router.get("/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Missing required query parameters",
        details: {
          startDate: !startDate ? "Start date is required" : null,
          endDate: !endDate ? "End date is required" : null,
        },
      });
    }

    const events = await Event.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
});

// Update an event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        message: "Validation failed",
        details: validationErrors,
      });
    }
    res
      .status(500)
      .json({ message: "Failed to update event", error: error.message });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
});

module.exports = router;
