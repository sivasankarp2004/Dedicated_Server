const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const { Smodel } = require("../sModel");

const mongoURI = 'mongodb+srv://kaschostel4:sivasankar@kaschostelcluster0.nopfs.mongodb.net/studentform';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const handler = async (req, res) => {
    // Your API logic here
    res.status(200).json({ message: "API is working!" });
};

module.exports = handler;
