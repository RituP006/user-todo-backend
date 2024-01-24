require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE_SCHEMA,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, DataTypes);
db.todos = require("./todo")(sequelize, DataTypes);

db.users.hasMany(db.todos, { foreignKey: "userId" });
db.todos.belongsTo(db.users, { foreignKey: "userId" });

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error in database sync : ", err);
  });

module.exports = db;
