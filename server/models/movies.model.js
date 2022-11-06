const mongoose = require('mongoose');
const Schema= mongoose.Schema;

let Movies = new Schema({
    moviename:{type:String,required:true},
    movieboughtdate:{type:String,required:true},
    genre:{type:String,required:true},
    duration:{type:String,required:true},
    year:{type:String,required:true}
})
module.exports = mongoose.model('Movie',Movies);