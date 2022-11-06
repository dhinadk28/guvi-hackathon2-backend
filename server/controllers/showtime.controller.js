const db = require('../models/index')

exports.create_showtime = async (req, res) => {
    var trigger;
    console.log('we got >>', req.body)
    trigger= await db.Showtime.findOne({time:req.body.time,date: req.body.date})
    // .then(result=>{
    //     trigger=result
    //     console.log(trigger)
        
    // })
    // .catch(err=>console.log(err))
    console.log("we have here",trigger)
    if(!trigger){
        console.log('hello from inside the route')
    let showtime = new db.Showtime({    
        moviename:req.body.moviename,
        totalnoseats:req.body.totalnoseats,
        seatsbooked: [],
        time: req.body.time,
        date: req.body.date
    })
    showtime.save().then(result=>{
        console.log(result)
        let reservation=new db.Reservation({
            moviename:req.body.moviename,
            bookedfor:[]
        })
        reservation.save().then(result=>{
            console.log(result)
            res.status(201).json({message:"Created And Placed the Booked table"})
        }).catch(err=>{
            console.log(err)
            res.status(500).json({error:"Something Went wrong"})
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:"Something went wrong"})
    })
}else{
    console.log("sorry date and time are taken")
}}

exports.getmovie_showtime=(req,res)=>{
    console.log("we have>>",req.body)
    db.Showtime.findOne({moviename:req.body.moviename,time:req.body.time,date:req.body.date})
    .then(result=>{
        console.log(result)
        res.send(result)
        // res.status(200).json({message:"List is Obtained"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Something Went Wrong"})
    })
}

exports.list_showtime=(req,res)=>{
    db.Showtime.find()
    .then(result=>{
        console.log(result)
        
        res.status(200).send(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Something Went Wrong"})
    })
}