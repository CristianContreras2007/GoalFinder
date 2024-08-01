const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());


app.use(express.json());


const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
  console.error('Missing MONGODB_URI in environment variables');
  process.exit(1);
}


mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  selectedOption: { type: String, required: true }, 
  additionalOption: String,
  address: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  startDay: { type: String, required: true },
  endDay: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  link: { type: String, required: true },
  images: { type: [String], required: true } 
});

const Program = mongoose.model('Program', ProgramSchema, 'programs');


const upload = multer({ dest: 'uploads/' });

app.post('/program', upload.array('photo', 4), async (req, res) => {
  try {
    const { title, description, selectedOption, additionalOption, address, startTime, endTime, startDay, endDay, phoneNumber, email, link } = req.body;
    const images = req.files ? req.files.map(file => file.path) : []; 

    if (!title || !description || !selectedOption || !address || !startTime || !endTime || !startDay || !endDay || !phoneNumber || !email || !link || images.length < 4) {
      return res.status(400).json({ error: 'All fields are required and at least 4 images must be uploaded' });
    }

    const newProgram = new Program({ title, description, selectedOption, additionalOption, address, startTime, endTime, startDay, endDay, phoneNumber, email, link, images });
    await newProgram.save();
    res.status(201).json({ message: 'Program submitted successfully!' });
  } catch (error) {
    console.error('Error submitting program:', error);
    res.status(500).json({ error: 'Failed to submit program', details: error.message });
  }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  reason: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'users');

app.post('/apply', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, reason } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application', details: error.message });
  }
});

app.get('/applications', async (req, res) => {
  try {
    const applications = await User.find();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications', details: error.message });
  }
});

const ProgramInfo = {
  email: 'streetsoccerla@goalfinder.com',
  password: bcrypt.hashSync('TEcunympROch', 10) 
};

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (email !== ProgramInfo.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, ProgramInfo.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
