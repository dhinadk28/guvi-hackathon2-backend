const express = require('express');
let router = express.Router();
const reservationcontroller= require('../controllers/reservation.controller')
const validatereservation=require('../models/validation/reservation.validate')
const showtimecontroller= require('../controllers/showtime.controller')
//======================Customer Control
router.post('/bookseat',validatereservation.validating,reservationcontroller.customer_book_seat)
router.post('/deletereservation',reservationcontroller.reservation_delete)
router.get('/listshowtime',showtimecontroller.list_showtime)

module.exports=router;

