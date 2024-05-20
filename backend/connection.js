const mongoose = require("mongoose");
dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URL;

function connect() {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

module.exports = connect;
