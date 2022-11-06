const { AuthAdminSchema }=require('./administrator.validmodel')
exports.validating=async function(req,res,next){
    const get={
        username:req.body.username,
        password:req.body.password,
        status:req.body.status
        }
    try{
        const result=await AuthAdminSchema.validateAsync(get)
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