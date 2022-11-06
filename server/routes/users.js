var express = require('express');
var router = express.Router();
const login_controller = require('../controllers/login.controller')
const signup_controller = require('../controllers/signup.controller')
const validatesignupcontroller= require('../models/validation/user.validate')
// router.get('/signup', signup_controller.register_form)
const cookieParser =  require('cookie-parser')
router.use(cookieParser());


// router.get('/cookie',(req,res)=>{
//     res.cookie('myCooki','mustafaImam')
//     res.send('Setting Cookiee')
// })
router.get('/home',login_controller.auth, login_controller.home)
router.get('/checkUser/:username', signup_controller.checkUser)
router.post('/register', validatesignupcontroller.validating,signup_controller.register)
router.post('/login', login_controller.loginchk)
router.get('/index/member/:username/edit-profile', login_controller.edit_profile)
router.post('/index/member/:username/edit-profile', login_controller.edited_profile)
router.get('/index/member/:username/change-password', login_controller.change_password_form)
router.post('/index/member/:username/change-password', login_controller.changed_password)
router.get('/logout', login_controller.logout)
module.exports = router;
