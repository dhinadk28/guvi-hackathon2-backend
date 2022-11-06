const { AuthShowTime }=require('./showtime.validmodel')
exports.validating=async function(req,res,next){
    const get={
        moviename:req.body.moviename,
        totalnoseats:req.body.totalnoseats,
        seatsbooked:0,
        time:req.body.time,
        date:req.body.date
    }
    try{
        const result=await AuthShowTime.validateAsync(get)
        console.log(get)
        console.log(result)
        // res.status(200).json({message:"validated"})
        next()
    }
    catch(err){
        if(err.isJoi===true) err.status=422
        console.log("there has been an error Credentials are not correct:",err)
        res.send(err)
        next(err)
    }
    
}