const express = require("express");

const {
  createTodo,
  getTodoByUserId,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

const router = express.Router();

router.post("/", createTodo);
router.get("/:userId", getTodoByUserId);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

module.exports = router;
