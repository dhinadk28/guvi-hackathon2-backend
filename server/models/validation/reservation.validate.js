const { AuthReservation }=require('./reservation.validmodel')
exports.validating=async function(req,res,next){
    const get={
        moviename:req.body.moviename,
        bookedfor:req.body.bookedfor
        }
    try{
        const result=await AuthReservation.validateAsync(get)
        console.log(get)
        console.log(result)
        next()
    }
    catch(err){
        if(err.isJoi===true) err.status=422
        console.log("there has been an error Credentials are not correct:",err)
        res.send(err)
        next(err)
    }
    
}