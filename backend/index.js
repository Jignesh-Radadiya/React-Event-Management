const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const multer = require('multer');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware to enable CORS


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for storing
  }
});

// Set up multer instance with the storage configuration
const upload = multer({ storage: storage });



// Define Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  passwordResetCount: {
    type: Number,
    default: 0
  }
  
});

// Define a Mongoose Schema for contact
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

// Define a Mongoose Schema for bookings
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  eventName: String,
  date: Date,
  time: String,
  eventPlace: String,
});

// Define the event schema
const eventSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  eventTitle: String,
  description: String,
  packageDetails: String
});

// Define Model
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Event = mongoose.model('Event', eventSchema);


// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// POST route to create a new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const newUser = new User({ name, email, mobile, password });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and password
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the user is an admin
    if (email === 'admin@gmail.com' && password === 'admin') {
      // If admin login, return a response indicating admin status
      return res.status(200).json({ message: "Login successful", isAdmin: true });
    } else {
      // Otherwise, return a response indicating regular user status
      return res.status(200).json({ message: "Login successful", isAdmin: false });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
});



// Define a route to fetch user data 
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Map through each user and calculate the password reset count
    const usersWithResetCount = await Promise.all(users.map(async (user) => {
      // Get the password reset count for each user
      const resetCount = await getPasswordResetCount(user.email);
      
      // Return user data with the password reset count
      return {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
        passwordResetCount: resetCount
      };
    }));

    // Send the user data with password reset count as JSON response
    res.json(usersWithResetCount);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'An error occurred while fetching user data' });
  }
});

// Function to calculate the password reset count for a user
async function getPasswordResetCount(email) {
  try {
    // Fetch the user from the database based on the email
    const user = await User.findOne({ email });

    // If user found, return the password reset count
    if (user) {
      return user.passwordResetCount || 0; // Default to 0 if password reset count is undefined
    } else {
      return 0; // Return 0 if user not found
    }
  } catch (error) {
    console.error('Error fetching password reset count:', error);
    return 0; // Return 0 in case of any error
  }
}


// Function to validate email format
function validateEmail(email) {
  // Regular expression for validating email format
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

app.post('/forgot-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = password;
    user.passwordResetCount += 1; // Increment password reset count
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'An error occurred while resetting the password' });
  }
});



// POST route to handle form submission
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
});

// Example route to fetch contact data
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Route to delete a contact entry
app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

// Define a route to handle booking submissions
app.post('/bookings', async (req, res) => {
  try {
    const { name, email, mobile, eventName, date, time, eventPlace } = req.body;
    const newBooking = new Booking({ name, email, mobile, eventName, date, time, eventPlace });
    await newBooking.save();
    res.status(200).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to submit booking' });
  }
});

// Example route to fetch booking data
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update a booking
app.put('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, eventName, date, time, eventPlace } = req.body;

    // Find the booking by ID and update its fields
    const updatedBooking = await Booking.findByIdAndUpdate(id, { name, email, mobile, eventName, date, time, eventPlace }, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Failed to update booking' });
  }
});

// Delete a booking
app.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking' });
  }
});


// Route to handle image upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  const imageUrl = '/uploads/' + req.file.filename;
  res.json({ imageUrl });
});

// Route to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to add events
app.post('/events', async (req, res) => {
  try {
    const { id, imageUrl, eventTitle, description, packageDetails } = req.body;
    const newEvent = new Event({ id, imageUrl, eventTitle, description, packageDetails });
    await newEvent.save();
    res.status(200).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Failed to add event' });
  }
});

// Read all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Update an event
app.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, eventTitle, description, packageDetails } = req.body;

    // Find the event by ID and update its fields
    const updatedEvent = await Event.findByIdAndUpdate(id, { imageUrl, eventTitle, description, packageDetails }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
});

// Delete an event
app.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

// Define a route to fetch event details by ID
app.get('/service/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch events from the database
app.get('/service/events', async (req, res) => {
  try {
    const events = await Event.find({}, 'eventTitle imageUrl');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});



// Endpoint to get the total number of users
app.get('/total-users', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Failed to fetch total users' });
  }
});

// Endpoint to get the total number of events
app.get('/total-events', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    res.json({ totalEvents });
  } catch (error) {
    console.error('Error fetching total events:', error);
    res.status(500).json({ error: 'Failed to fetch total events' });
  }
});

// Endpoint to get the total number of bookings
app.get('/total-bookings', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    res.json({ totalBookings });
  } catch (error) {
    console.error('Error fetching total bookings:', error);
    res.status(500).json({ error: 'Failed to fetch total bookings' });
  }
});

// Endpoint to get the total number of contacts
app.get('/total-contacts', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    res.json({ totalContacts });
  } catch (error) {
    console.error('Error fetching total contacts:', error);
    res.status(500).json({ error: 'Failed to fetch total contacts' });
  }
});

// Route to filter events based on date range
app.get('/filter', async (req, res) => {
  const { start, end } = req.query;

  try {
    const events = await Booking.find({
      date: {
        $gte: new Date(start), // Start date (greater than or equal to)
        $lte: new Date(end),   // End date (less than or equal to)
      },
    });
    res.json(events);
  } catch (error) {
    console.error('Error filtering events:', error);
    res.status(500).json({ error: 'Failed to filter events' });
  }
});

// Route to fetch event card data from bookings
app.get('/event-cards', async (req, res) => {
  try {
    const bookings = await Booking.find({}, 'eventName date eventPlace');
    const eventCards = booking.map(booking => ({
      eventTitle: booking.eventName,
      date: booking.date,
      location: booking. eventPlace,
    }));
    res.status(200).json(eventCards);
  } catch (error) {
    console.error('Error fetching event cards from bookings:', error);
    res.status(500).json({ error: 'Failed to fetch event cards from bookings' });
  }
});

// This endpoint checks if the user is authenticated
// app.get('/api/auth/check', (req, res) => {
//   // Check if the user is authenticated
//   if (req.isAuthenticated()) {
//     // User is authenticated, send back a success response with isLoggedIn as true
//     res.json({ isLoggedIn: true });
//   } else {
//     // User is not authenticated, send back a success response with isLoggedIn as false
//     res.json({ isLoggedIn: false });
//   }
// });



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








// // // app.get('/register', async (req, res) => {
// // //   res.send('server is running!');

  
// // // });
