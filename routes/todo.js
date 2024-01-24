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
router.put("/:todo", updateTodo);
router.delete("/:todo", deleteTodo);

module.exports = router;
