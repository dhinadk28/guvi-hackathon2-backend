const { AuthUser }=require('./user.validmodel')
exports.validating=async function(req,res,next){
    console.log("we are at authuser validation")
    const get={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        gender:req.body.gender,
        contact:req.body.contact,
        city:req.body.city,
        address:req.body.address,
        password:req.body.password,
        }
    try{
        const result=await AuthUser.validateAsync(get)
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