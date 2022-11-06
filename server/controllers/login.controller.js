const db = require('../models/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var mongo = require('mongodb');
const e = require('express');

exports.loginchk = async (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} <=> ${password}`);
    try {
        if (!username || !password) {
            return res.status(404).json({ error: 'Please enter all the credentials' })
        } else {
            if(username=="admin"&& password=="admin.123"){
                req.session.user=username;
                console.log('Admin Loged In')
                const tokenAdmin = '/admin'
                console.log(password)
                const dataToFront = {password, tokenAdmin}
                res.send(dataToFront)
            }else{
            const userLogin = await db.Users.findOne({ username: username });
            console.log(userLogin);
            if (userLogin) {
                const isMatch = await bcrypt.compare(password, userLogin.password)
                console.log(isMatch)
                const token = await userLogin.generateAuthToken();
                console.log(`token => ${token}`)

                // storing token in cookie 
                console.log('cookie :>> ', token);
                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 2500000000),
                    httpOnly: true
                })
                res.send(token)

                if (!isMatch) {
                    console.log('invalid credentials')
                    return res.status(400).json({ error: "Invalid Credientials" });

                } else {
                    // If Every thing is ture then this method
                    console.log('every thing is matched')
                    console.log(`/index/member/${req.session.user.username}`)
                    req.session.user = userLogin;
                    // res.redirect('index/member/' + req.session.user.username)
                    // return res.status(200).json({ logedin_to: `/index/member/${req.session.user.username}` })

                    // res.status(200).json({ message: "loged in Successfully" });

                }

            } else {
                console.log('invalid credentials')
                return res.status(400).json({ message: "Invalid Credientials" });
            }
         }
        }
    } catch (err) {
        console.log('got here')
        console.log(err)
    }
}

exports.home = (req,res)=>{
    console.log('My Home Page');
    res.send(req.rootUser)
}

exports.auth = async (req, res, next)=>{
    try {
        
const token = req.cookies.JWTtoken;
const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
const obj_id = new mongo.ObjectId(verifyToken._id);
console.log('object ID :>> ', obj_id);
const rootUser = await db.Users.findOne({'_id': obj_id, "tokens.token":token})

console.log('token :>> ', token);
console.log('verifyToken :>> ', verifyToken);
console.log('rootUser :>> ', rootUser);

if(!rootUser){
    throw new Error("User Not Found")

}else{
    console.log("Authentic User");
    req.token=token;
    req.rootUser = rootUser
    req.userID = rootUser._id;
    
    next();
}

    } catch (error) {
        res.status(401).send('Unauthorized')
        console.log("Please Login first");
    }
}

exports.edit_profile = (req, res) => {
    console.log(req.params.username);
    db.Member.findOne({ username: req.params.username }).then(users => {
        console.log(users)
        console.log('edit_profile form')
        res.render('edit-profile', { title: 'Edit-Profile', session: users })
    }).catch(err => console.log(err))
}


exports.edited_profile = async (req, res) => {
    console.log(req.body)
    console.log(req.body.name)
    console.log(req.params.username)
    await db.Member.updateOne({ username: req.params.username }, { $set: req.body }).then(result => {
        console.log('part where update is done ')
        console.log(result)
        res.redirect('/index/member/' + req.body.username)
    }).catch(err => console.log(err))
}


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err)
        } else {
            console.log('Destroying session');
        }
        res.redirect('/')
    });
}


exports.change_password_form = (req, res) => {
    console.log(req.session.user)
    res.render('Passwordform', { title: 'ChangePassword', session: req.session.user })
}


exports.changed_password = (req, res) => {
    console.log(req.body)
    console.log(req.params.username)
    if (req.body.newpassword === req.body.confirmpassword) {
        db.Member.findOneAndUpdate({ username: req.params.username, password: req.body.oldpassword }, { $set: { password: req.body.newpassword } }).then(user => {
            console.log(user)
            res.redirect('/index/member/' + user.username)
        })
    } else {
        res.render('error')
    }

}
