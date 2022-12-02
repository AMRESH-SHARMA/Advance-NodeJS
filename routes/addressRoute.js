const express = require("express");
const router = express.Router();
const { addAddress, deleteAddress } = require("../controllers/addressController");
const { validateAddress, validateDeleteAddress } = require('../middlewares/validators/userValidator');
const { isAuthenticated } = require('../middlewares/auth');


router.route('/address').post(validateAddress, isAuthenticated, addAddress)

router.route('/address/:user_id').delete(validateDeleteAddress,deleteAddress)

module.exports = router;