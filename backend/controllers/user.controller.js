
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const config = require('../config/auth.config');

exports.signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = await user.comparePassword(req.body.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
