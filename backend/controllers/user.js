const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const User = require('../models/user')

exports.createUser= (req,res,next)=>{
    console.log('post====')
    bcrypt.hash(req.body.password,10).then(hash=>{
        const user = new User({
            email : req.body.email,
            password : hash
        })

        user.save().then(result=>{
            res.status(201).json({
                message : 'userCreate',
                result : result
            })
        }).catch(err=>{
            res.status(500).json({
                message : "invalid authentication credenioal"
            })
        })
    })
}

exports.loginUser= (req,res,next)=>{
    let fetchedUser;
    User.findOne({email : req.body.email}).then(user=>{
        if(!user){
            return res.status(401).json({
                message : 'auth failed'
            })
        }
        console.log("===user",user)
        fetchedUser = user
        return bcrypt.compare(req.body.password,user.password)
    }).then(result=>{
        if(!result){
            return res.status(401).json({
                message : 'Invalid authentication credential'
            })
        }
        console.log("===",fetchedUser)
        const token = jwt.sign({ email: fetchedUser.email,userId:fetchedUser._id},'secret_this_should_be_lonnger',{
            expiresIn : '1hr'
        })
        res.status(200).json({
            token : token,
            expiresIn : 3600,
            userId:fetchedUser._id
        })

    }).catch(err=>{
        return res.status(401).json({
            message : 'auth failed' 
    })
})
}
