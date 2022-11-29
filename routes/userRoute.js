const express = require("express");
const router = express.Router();
const { register, login, info, infoAllUsers, allInfoByUserId } = require("../controllers/userController");
const { validateRegister, validateLogin, validateAccessToken, validatePageQuery, validateParam } = require('../middlewares/validators/userValidator');
const { isAuthenticated } = require('../middlewares/auth');



//Validation layer checks for all validations for register then, pass, controlflow to register controller
router.route("/register").post(validateRegister, register)

router.route("/login").post(validateLogin, login)

router.route("/info").get(validateAccessToken,isAuthenticated,info)

router.route('/list').get(validatePageQuery,isAuthenticated,infoAllUsers)

router.route('/get/:id').get(validateParam,isAuthenticated,allInfoByUserId)

module.exports = router;