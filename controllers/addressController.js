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


exports.deleteAddress = async (req, res) => {
  try {
    let userUpdate = await User.updateMany({}, { $pull: { address: { $in: req.body._id } } })
    if(userUpdate){
      let result = await Address.deleteMany({ _id: { $in: req.body._id } })
      return res.status(200).json({ success: true, data: `${result.deletedCount} Records Deleted` })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};