const db=require('../models/index')
exports.create_admin=(req,res)=>{
    var trigger;
    console.log('We got >>',req.body)
    db.Administer.findOne({username:req.body.username})
    .then(result=>{
        console.log(result)
        trigger=result
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:"Something Went Wrong"})
    })
    console.log("we have",trigger)
    if(!trigger){
    let administrator=new db.Administer({
        username:req.body.username,
        password:req.body.password,
        status:req.body.status
    })
    administrator.save()
    .then(result=>{
        console.log(result)
        res.status(201).json({message:"Admin Created"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Something Went Wrong"})
    })
}else{
    console.log("Username Already Exist")
    res.status(200).json({message:"Working on Admin"})
}
}
exports.list_admin=(req,res)=>{
    db.Administer.find()
    .then(result=>{
        console.log(result)
        res.status(200).json({message:"Working Properly"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Something Went Wrong"})
    })
}
exports.delete_admin=(req,res)=>{
    try{
    console.log('We are deleting now',req.body)
    var ar=[ "smustafa086@gmail.com", "davi@gmail.com"]
     ar.forEach(element => {
        console.log(element)
        db.Administer.findOneAndDelete({username:element})
         .then(result=>{
             console.log("deleted",result)
             res.status(200).json({message:"Deleted"})
         }).catch(err=>{
             console.log(err)
             res.status(500).json({error:"Something Went Wrong"})
         })
     });
    }catch(err){
        console.log(err)
    }
}