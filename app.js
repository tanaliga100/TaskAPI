const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const authRoute = require("./routes/auth_route");
const tasksRoute = require("./routes/tasks_route");
require("dotenv").config();
// console.log(process.env);

// Top - Middlwares
app.use(express.static("./public"));
app.use(express.json());
// Routes
app.use("/auth", authRoute);
app.use("/api/v1/tasks", tasksRoute);
//Bottom - Middlwares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen((PORT = process.env.PORT || 6000), () => {
      console.log(
        `Server listening on port ${PORT}...and successfully connected to MONGO_DB `
      );
    });
  } catch (error) {
    console.log(`Has an error ${error}`);
  }
};
start();
