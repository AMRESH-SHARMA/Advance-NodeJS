const User = require("../models/userModel")
const Address = require("../models/addressModel");

exports.addAddress = async (req, res) => {
  try {
    const data = {
      user_id: req.body.user_id,
      pin_code: req.body.pin_code,
      user_address: req.body.user_address,
    };
    const newPost = await Address.create(data);
    const user = await User.findById(req.body.user_id);
    user.address.push(newPost._id)
    const result = await user.save();
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};