// variables
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const port = process.env.PORT || 5000;
const multer = require("multer");
const path = require("path");

// env connection
dotenv.config();

// database connection
mongoose.set("strictQuery", false);
connectDB();

// images routes
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// image upload with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully.");
  } catch (err) {
    console.log(err);
  }
});

// routes
// app.use("/", (req, res) => {
//   res.send("Server is live");
// });
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// run port
app.listen(port, () => {
  console.log("Backend server is live..");
});
