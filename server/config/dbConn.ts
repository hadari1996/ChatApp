import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("mongoose Error");
    console.log(error.message);
  });

