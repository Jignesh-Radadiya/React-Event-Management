const mongoose = require('mongoose');

// Define the schema for the Event model
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Add other fields as needed
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
