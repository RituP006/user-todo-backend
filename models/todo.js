module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  });

  // Todo.associate = (models) => {
  //   Todo.belongsTo(models.User, { foreignKey: "userId" });
  // };

  return Todo;
};
