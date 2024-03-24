require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pollingRoutes = require('./routes/pollingRoutes');
const partyRoutes = require('./routes/partyRoutes');
const app = express();
app.use(cors({
  origin:'https://kavinm004.github.io/Polling-Frontend',
  methods: 'GET, POST, PUT, PATCH, DELETE, HEAD',
    credentials: true,
}));
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MongoDB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`));

// Use routes
app.use('/api/party', partyRoutes);
app.use('/api/polling', pollingRoutes);
