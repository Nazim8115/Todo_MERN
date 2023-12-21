import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Not Started",
    enum: ["Not Started", "In Progress", "Completed"],
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
