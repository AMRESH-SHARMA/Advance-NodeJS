const express = require("express");
const router = express.Router();
const { addAddress } = require("../controllers/addressController");
const { validateAddress } = require('../middlewares/validators/addressValidator');
const { isAuthenticated } = require('../middlewares/auth');


router.route('/address').post(validateAddress, isAuthenticated, addAddress)