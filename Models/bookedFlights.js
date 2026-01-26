let mongoose = require("mongoose");

let bookedFlightSchema = new mongoose.Schema({
  airline: String,
  arrivalTime: String,
  departureTime: String,
  booked: { type: Boolean, default: false },
  duration: String,
  from: String,
  to: String,
  userId: String,
  availableSeats: Number,
  stops: Number,
  price: String,
  persons: String,
});

let Bookf = mongoose.model("Bookf", bookedFlightSchema);

module.exports = Bookf;
