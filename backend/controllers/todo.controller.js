import Todo from "../model/todo.model.js";

export default class TodoController {
  // create todo
  createTodo = async (req, res) => {
    const { title, description, status } = req.body;
    console.log(req.body);
    const user_id = req.user.user_id;
    console.log(user_id);

    try {
      const newTodo = new Todo({
        title,
        description,
        status,
        user_id,
      });

      await newTodo.save();
      res.json(newTodo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };

  // get all todos .......
  getAllTodos = async (req, res) => {
    try {
      const todos = await Todo.find({ user_id: req.user.user_id });
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // get single todo by id........
  getSingleTodo = async (req, res) => {
    try {
      const todo = await Todo.findOne({
        _id: req.params.id,
      });
      if (!todo) {
        return res.status(404).json({ message: "todo not found" });
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // update todo by id........
  updateTodo = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const updatedTodo = await Todo.findOneAndUpdate(
        {
          _id: req.params.id,
          user_id: req.user.user_id,
        },
        { title, description, status },
        { new: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "todo not found " });
      }
      res.status(200).json({ message: "updated successfully", updatedTodo });
    } catch (error) {}
  };

  deleteTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res
        .status(200)
        .json({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
