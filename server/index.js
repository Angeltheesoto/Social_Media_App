const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth");
dotenv.config();
mongoose.set("strictQuery", false);
connectDB();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log("Backend server is live..");
});
