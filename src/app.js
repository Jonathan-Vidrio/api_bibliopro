// Libraries imports
import express from "express";
import morgan from "morgan";
import { configServer } from "./config";

// Routes imports
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import { createRoles } from "./libs/initialSetup";

// Create aplication express
const app = express();
createRoles();

// Settings
app.set("port", configServer.port || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/login/", authRoutes);
app.use("/api/users/", userRoutes);

export default app;