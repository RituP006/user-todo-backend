const db = require("../models");

const Todo = db.todos;
const User = db.users;

exports.createTodo = async (req, res, next) => {
  const { title, isComplete, userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const newTodo = await Todo.create({
      title,
      isComplete,
      userId,
    });

    res.status(201).json({ status: "success", data: newTodo });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  const todoId = req.params.todo;
  const { title, isComplete, userId } = req.body;
  try {
    const todo = await Todo.findOne({ where: { id: todoId } });
    if (!todo) {
      return res
        .status(404)
        .json({ status: "error", message: "Todo not found" });
    }

    todo.title = title;
    todo.isComplete = isComplete;
    const updatedTodo = await todo.save();
    res.status(200).json({
      status: "success",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todo;

    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "Todo not found",
      });
    }

    const result = await todo.destroy();

    res.status(200).json({
      status: "success",
      data: result,
      message: "Todo deleted successfullt!",
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getTodoByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      include: Todo,
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: user.todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
