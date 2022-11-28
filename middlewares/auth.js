const { ObjectId } = require('mongodb');
const user = require("../models/userModel")

const isAuthenticated = async (req, res, next) => {
  try {
    const userDetail = await user.findById({ _id: ObjectId(req.headers.access_token) })
    if (!userDetail) return res.status(404).json({success: false,message: 'Access Token Does not Exist'})
    req.user = userDetail
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { isAuthenticated }