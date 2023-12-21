import express from "express";
import "dotenv/config";
import verifyToken from "./middleware/auth.middleware.js";
import connectDB from "./model/dbConnection.js";
import { userRoutes } from "./routes/user.routes.js";
import { todoRoutes } from "./routes/todo.routes.js";
import cors from "cors";
const app = express();
app.use(cors());
connectDB();

// middleware for parsing json.........

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/todos", verifyToken, todoRoutes); // i can add auth middleware hare ..... added

app.listen(process.env.Port, () =>
  console.log("app is listening on port !", process.env.Port)
);
