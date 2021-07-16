'use strict'

const mongoose = require('mongoose')
const User = require('../modelos/user')

function signUp(req,res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    })
    user.save((err)=> {
        if(err) res.status(500).send({message: `Error al crear el usuario ${err}`})

        return res.status(200).send({token: Service.createToken(user)})
    })
}

function singIn(req,res){

}

module.exports={
    signUp,
    signUp
}