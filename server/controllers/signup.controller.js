const db = require('../models/index')

exports.checkUser = (req, res) => {
    res.cookie('SignUp', 'Mustafa')
    const username = req.params.username;
    console.log('Request Made For Check User')
    console.log('Data Recived')
    console.log('-------------------')
    console.log(req.params.username)
    console.log(req.body)
    console.log('username :>> ', username);

    db.Users.findOne({ username: username }).then(result => {
        res.send(result)
        console.log('Data to be sent to client')
        console.log(result)
    }).catch(err => { res.send(err) })
}

exports.register = (req, res) => {
    console.log('Request Made')
    console.log('Data from Front end')
    console.log('-------------------')
    console.log(req.body)

    let { firstName, lastName, username, gender, contact, city, address, password } = req.body; 
    if (!firstName || !lastName || !username || !gender || !password || !contact || !city || !address ) {
        console.log('Incomplete Data from front end')
        res.status(422).json({ error: "All feilds not filled" })
    } else {
        db.Users.findOne({ username: req.body.username }, (err, exists) => {
            if (exists) {
                console.log(username, "Username not acceptable")
                return res.status(422).json({ error: "First User Name already exists" })
            } else {
                console.log("is acceptable")
                // res.json({ message: req.body })
                let reg = new db.Users({
                    firstName,
                    lastName,
                    username,
                    gender,
                    contact,
                    city,
                    address,
                    password,
                })
                reg.save().then(result => {
                    console.log("saved to Mongo>>", result)
                    return res.status(201).json({ message: "User registerd Successfully" })
                }).catch(err => {
                    console.log(err)
                    return res.status(500).json({ message: "Failed to register" })
                }
                )
                // res.redirect('/')
            }
        }).then((out) => {
            console.log(out)
            console.log('user name already exists')
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ message: "Failed to register" })

        })
    }
}

