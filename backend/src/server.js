import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import createIndividual from "./routes/create.routes.js";

dotenv.config();

const originPORTS = ["http://localhost:5173", "http://localhost:5174"];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: originPORTS,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Create success and failure middleware
app.use((req, res, next) => {
  // Success response
  res.success = (status, message, data = null) => {
    res.status(status).json({
      success: true,
      message,
      data: { data },
    });
  };

  // Error response
  res.err = (status, message) => {
    res.status(status).json({
      success: false,
      message,
    });
  };
  next();
});

//Routes example : localhost:4000/api/auth/signin

//AUTH ROUTES
app.use("/api/auth", authRoutes);

//USER ROUTES
app.use("/api/user", userRoutes);
//POST ROUTES
app.use("/api/post", postRoutes);

//ADMIN ROUTES
app.use("/api/admin/users", adminRoutes);

//Create admin/user/professionals
app.use("/api/create", createIndividual);

//Connecting Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected Successfully !!!"))
  .catch((err) => console.log(err, "Failed To Connect DB"));

// Error middleware
app.use((err, req, res, next) => {
  res.err(err.status || 500, err.message || "Internal Server Error");
  next();
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running at port: ${process.env.PORT}`),
);
