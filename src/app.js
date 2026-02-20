import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "https://college-counselling.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", dashboardRoutes);
app.use("/api/contact", contactRoutes);

app.use(errorMiddleware);

export default app;
