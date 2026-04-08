const mongoose = require("mongoose");
const connectDb = async () => {
  require("dotenv").config();

  console.log(
    "Using DB:",
    process.env.MONGO_URI.includes("mongodb+srv") ? "Atlas" : "Local"
  );
  console.log(" Connection URI:", process.env.MONGO_URI);

  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(" Connected to MongoDB Atlas");
      console.log(" Database name:", mongoose.connection.name);
      console.log(" Connection host:", mongoose.connection.host);
    })
    .catch((err) => {
      console.error(" MongoDB Atlas connection error:", err);
      process.exit(1);
    });
};
module.exports = connectDb;
