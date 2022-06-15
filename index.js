const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Import Routes
const authRoute = require("./routes/auth");
const pasalRouter = require('./routes/pasal')

dotenv.config();

// Connect to db
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database...'))

// Middlewares
app.use(express.json());
// Route Middlewares
app.use("/api/auth", authRoute);
app.use('/api/pasal', pasalRouter)

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server runnung at: localhost:${process.env.PORT}`);
});
