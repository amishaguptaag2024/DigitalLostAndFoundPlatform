import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// Mount API routes
import apiRoutes from "./routes";

app.use("/api", apiRoutes);

export default app;
