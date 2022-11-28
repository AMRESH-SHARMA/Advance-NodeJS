const User = require("../models/userModel")
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    //Bcrypt password
    const hash = bcrypt.hashSync(req.body.pass, 10);

    let registerData = new User({
      username: req.body.username,
      email: req.body.email,
      pass: hash
    });
    await registerData.save()
      .then((result) => { res.send(result) });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    //Specifically Select pass field from db only for this request
    var data = await User.findOne({ username: req.body.username }).select('+pass')
    if (data) {
      bcrypt.compare(req.body.pass, data.pass)
        .then(() => res.status(200).json({ result: "Login sucessfully", acccess_token: data._id }))
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.info = async (req, res) => {
  try {
    res.status(200).send(req.user)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};