const { AuthMovies }=require('./movies.validmodel')
exports.validating=async function(req,res,next){
    const get={
        moviename:req.body.moviename,
        movieboughtdate:req.body.movieboughtdate,
        genre:req.body.genre,
        duration:req.body.duration,
        year:req.body.year
        }
    try{
        const result=await AuthMovies.validateAsync(get)
        console.log(get)
        console.log(result)
        console.log(`validated`, result)
        // res.status(200).json({message:"validated"})
        next()
    }
    catch(err){
        if(err.isJoi===true) err.status=422
        console.log("there has been an error Credentials are not correct:",err)
        // res.send(err)
        console.log(`err in the catch`, err)
        next(err)
    }
    
}