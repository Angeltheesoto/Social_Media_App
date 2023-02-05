const mongoose = require("mongoose");

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(
      "mongodb+srv://angelsoto:nNqwEB8bRfZlYOxv@cluster2.3us7xfj.mongodb.net/?retryWrites=true&w=majority" || {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
