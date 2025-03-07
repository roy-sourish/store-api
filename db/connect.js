const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `✅ MongoDB connection successful: ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
