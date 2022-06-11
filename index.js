const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Import Routes
const authRoute = require("./routes/auth");

dotenv.config();

// Connect to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to db...");
});

// Middlewares
app.use(express.json());
// Route Middlewares
app.use("/api/auth", authRoute);

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server runnung at: localhost:${process.env.PORT}`);
});
