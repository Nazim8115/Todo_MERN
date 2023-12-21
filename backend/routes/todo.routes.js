import express from "express";
const router = express.Router();
import TodoController from "../controllers/todo.controller.js";

const todoController = new TodoController();

router.post("/create", todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getSingleTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
export { router as todoRoutes };
