const joi = require('joi')
let AuthAdminSchema= joi.object({
   username:joi.string().email().required(),
   password:joi.string().length(8).pattern(new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$')).required(),
   status:joi.string().valid('Active','Inactive').required()
})
module.exports={AuthAdminSchema}

/*
const joi=require('joi')
const authSchema=joi.object({
    username:joi.string().lowercase().required(),
    password:joi.string().max(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})
module.exports={authSchema}
########
const { authSchema }=require('./users.vallidatescheme')
exports.validating=async function(req,res,next){
    const get={
        username:req.body.username,
        password:req.body.password
        }
    try{
        const result=await authSchema.validateAsync(get)
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
*/