import express from "express";

import cors from "cors";

import studentRoutes from "./router/studentRoutes";

import { errorMiddleware } from "./middleware/errorMiddleware";

import { notFoundMiddleware } from "./middleware/notFoundMiddleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", studentRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;