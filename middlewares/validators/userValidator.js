const { check, query, validationResult } = require('express-validator');
const User = require("../../models/userModel")

exports.validateRegister = [
  check('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail()
    .custom(async value => {
      const res = await User.findOne({ username: (value) });
      if (res) {
        return Promise.reject('User Name already in use');
      }
    })
    .bail(),
  check('email')
    .trim()
    .notEmpty()
    .withMessage("Email name can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Invalid email address!")
    .bail()
    .custom(async value => {
      const res = await User.findOne({ email: (value) });
      if (res) {
        return Promise.reject('E-mail already in use');
      }
    })
    .bail(),
  check('pass')
    .notEmpty()
    .withMessage('Password can not be empty!')
    .bail(),
  check('cpass')
    .custom((value, { req }) => {
      if (value !== req.body.pass) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];


exports.validateLogin = [
  check('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('pass')
    .notEmpty()
    .withMessage('Password can not be empty!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];


exports.validateAccessToken = [
  check('access_token')
    .exists()
    .withMessage('Access Token Does not exist')
    .bail()
    .notEmpty()
    .withMessage('Access Token can not be empty')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];


exports.validatePageQuery = [
  query('page')
    .exists()
    .notEmpty()
    .trim()
    .isInt()
    .withMessage('Query is not valid integer')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];


exports.validateAddress = [
  check('user_id')
    .exists()
    .notEmpty()
    .withMessage('User id can not be empty!')
    .bail(),
  check('pin_code')
    .exists()
    .notEmpty()
    .withMessage('Pin Code can not be empty!')
    .bail()
    .isInt()
    .withMessage("Pin Code can not be Non Integer")
    .bail(),
  check('user_address')
    .exists()
    .notEmpty()
    .withMessage('Address can not be empty')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];