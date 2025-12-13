const userSignupController = require('../controller/userSignupController');
const userSigninController = require('../controller/userSigninController')
const express = require('express');
const route = express.Router();

route.post('/signup',userSignupController.signup);
route.post('/signin',userSigninController.signin)

module.exports = route;