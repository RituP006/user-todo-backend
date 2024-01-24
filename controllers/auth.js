const db = require("../models");

const User = db.users;
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profileImage: req.body.profileImage,
  };
  if (!user.firstName || !user.lastName || !user.password || !user.email) {
    res.status(400).json({
      status: "error",
      message: "Please enter all details",
    });
    return;
  }

  try {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      console.warn("Error in Registration : User already exist");
      res.status(400).json({
        status: "error",
        message: "User already exists",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const createdUser = await User.create({
      ...user,
      password: hashedPassword,
    });

    const { password: _, ...result } = createdUser.dataValues;

    res.status(201).json({
      status: "success",
      data: result,
    });
    return;
  } catch (error) {
    console.error("Error in Registration : ", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });

  if (user) {
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      const { password: _, ...result } = user.dataValues;
      res.status(200).json({
        status: "success",
        data: result,
      });
    } else {
      res.status(400).json({ status: "error", message: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ status: "error", message: "User does not exist" });
  }
};

module.exports = {
  register,
  login,
};
