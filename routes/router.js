const express = require("express");
const router = express.Router();
const { createUser, loginUser, validateUser } = require('../controllers/userController');
const authenticateJwt = require("../middlewares/authenticate");
const { CREATE_USER_ENDPOINT, LOGIN_USER_ENDPOINT, VALIDATE_USER_ENDPOINT } = require('../constants/constants');

router.post(CREATE_USER_ENDPOINT, createUser);
router.post(LOGIN_USER_ENDPOINT, loginUser);
router.get(VALIDATE_USER_ENDPOINT, authenticateJwt, validateUser);

module.exports = router;
