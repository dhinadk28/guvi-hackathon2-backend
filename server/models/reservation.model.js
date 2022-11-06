const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Reservation= new Schema({
   moviename:{type:String,required:true},
   bookedfor:[{type:String, required:true}]
})
module.exports=mongoose.model('Reservation',Reservation)