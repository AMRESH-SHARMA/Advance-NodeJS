const { check, validationResult } = require('express-validator');

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