import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import eventRouter from "./routes/event";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/eventDB";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
     status: "success",
     message: "API is running"
     });
});

app.use("/auth", authRoutes);
app.use('/api/event', eventRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
}

start();

export default app;
