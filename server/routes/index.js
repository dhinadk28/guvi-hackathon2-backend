const index_controller= require('../controllers/index.controller')
const validatemovieschema =require('../models/validation/movies.validate')
const validatereservation=require('../models/validation/reservation.validate')
const validatesignupcontroller=require('../models/validation/user.validate')
const moviecontroller= require('../controllers/movies.controller')
const reservationcontroller= require('../controllers/reservation.controller')
const showtimevalidation= require('../models/validation/showtime.validate')
const showtimecontroller= require('../controllers/showtime.controller')
const customercontroller= require('../controllers/customer.controller')
const admincontroller= require('../controllers/administrator.controller')
const validateadmin=require('../models/validation/administrator.validate')
const express = require('express');
let router = express.Router();

router.get('/admin', index_controller.admin);

//=============Moviw
router.post('/admin/registermovie',validatemovieschema.validating,moviecontroller.movie_create)
router.post('/admin/deletemovie',moviecontroller.movie_delete)
router.post('/admin/updatemoviedetails',moviecontroller.movie_update)
router.get('/admin/listmovies',moviecontroller.movie_list)
//=============Showtime
router.post('/admin/getmoveshowtime',showtimecontroller.getmovie_showtime)
router.post('/admin/setshowtime',showtimecontroller.create_showtime)
router.get('/admin/listshowtime',showtimecontroller.list_showtime)
//=============Reservation
router.post('/admin/bookseat',validatereservation.validating,reservationcontroller.book_seat)
router.get('/admin/showreservation',reservationcontroller.reservation_list)
router.post('/admin/deletereservation',reservationcontroller.reservation_delete)
//=============Administration Admin CRUD
router.post('/admin/createnewadmin',validateadmin.validating,admincontroller.create_admin)
router.post('/admin/deleteadmin',admincontroller.delete_admin)
router.get('/admin/listadmin',admincontroller.list_admin )
//=============Administration Customer CRUD
router.get('/admin/listcustomer',customercontroller.list_customers)
router.post('/admin/deletecustomer',customercontroller.delete_customer)
router.get('/admin/:id/updateform',customercontroller.update_customer)
router.post('/admin/:id/updated',validatesignupcontroller.validating,customercontroller.now_updated)
//==========================
router.post('/admin/bookseat',validatereservation.validating,reservationcontroller.book_seat)
router.get('/member/:userid', index_controller.member);
module.exports = router;
