import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";
const userController = new UserController();
router.post("/register", userController.getRegister);
router.post("/login", userController.getLogin);
export { router as userRoutes };
