const express = require("express");
const router = express.Router();
const { register, login, info, infoAllUsers } = require("../controllers/userController");
const { validateRegister, validateLogin, validateAccessToken, validatePageQuery } = require('../middlewares/validators/userValidator');
const { isAuthenticated } = require('../middlewares/auth');



//Validation layer checks for all validations for register then, pass, controlflow to register controller
router.route("/register").post(validateRegister, register)

router.route("/login").post(validateLogin, login)

router.route("/info").get(validateAccessToken,isAuthenticated,info)

router.route('/list').get(validatePageQuery,isAuthenticated,infoAllUsers)

module.exports = router;