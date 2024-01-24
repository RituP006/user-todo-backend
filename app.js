const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./models");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/user", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port);
