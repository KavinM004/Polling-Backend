require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pollingRoutes = require('./routes/pollingRoutes');
const partyRoutes = require('./routes/partyRoutes');


const app = express();

app.use(express.json());
app.use(cors({
  origin:'https://65ffe1a1cc88cd0008c8ea3a--polling-voting-app.netlify.app/',
  methods: 'GET, POST, PUT, PATCH, DELETE, HEAD',
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MongoDB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`));

// Use routes
app.use('/api/party', partyRoutes);
app.use('/api/polling', pollingRoutes);
