const mongoose = require('mongoose')
const Schema =mongoose.Schema;
let Showtime=new Schema({
    moviename:{type:String,required:true},
    totalnoseats:{type:Number,required:true},
    seatsbooked:[{type:Number,required:true}],
    time:{type:String,required:true},
    date:{type:String,required:true}
})

module.exports=mongoose.model('Showtime',Showtime)