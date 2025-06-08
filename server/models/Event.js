const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:mm
    icon: { type: String, default: "" },
    location: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
