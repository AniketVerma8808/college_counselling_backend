import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", dashboardRoutes);

app.use(errorMiddleware);

export default app;
