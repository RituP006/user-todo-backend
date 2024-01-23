module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    profileImage: { type: DataTypes.STRING, allowNull: true },
  });

  // User.associate = (models) => {
  //   User.hasMany(models.Todo, { foreignKey: "userId" });
  // };

  return User;
};
