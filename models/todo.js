module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    title: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  });

  return Todo;
};
