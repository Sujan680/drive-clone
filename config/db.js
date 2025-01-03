const mongoose = require("mongoose");

// Function to connect to the database
function connectDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to the database");
  });
}

// Export the function to be used in the app.js file
module.exports = connectDB;
