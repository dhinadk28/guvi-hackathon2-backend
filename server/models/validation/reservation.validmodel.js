const joi=require('joi')
let AuthReservation= joi.object({
   moviename:joi.string().required(),
   bookedfor:joi.string().email().required()
})
module.exports={AuthReservation}