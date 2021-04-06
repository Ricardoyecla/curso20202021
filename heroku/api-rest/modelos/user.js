'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt-nodejs')
const crypto =require('crypto')



const UserSchema= new Schema({
    email:{type:String, unique:true, lowercase:true},
    displayName:String,
    avatar: String,
    password:{type:String, select:false},
    signupDate:{type:Date, default:Date.now()},
    lastLogin:Date
})

//Antes de salvar el esquema se debe ejecutar la siguiente 
//función
UserSchema.pre('save',(next)=>{
    //El usuario a guardar
    let user=this
    //Si el usuairo no ha modificado su contraseña se
    //termina y se pasa al siguiente nivel
    if (!user.isModified('password')) return next()
    
    //Generamos un salt semilla
    bcrypt.genSalt(10,(err,salt)=>{
        if (err) return next()
        //Haseamos el password con el salt que hemos
        //generado y 
        bcrypt.hash(user.password,salt, null, (err,hash)=>{
            if (err) return next(err)
            //La nueva pasword será el hash que hemos creado
            user.password=hash
            //Seguimos 
            next()
        })
    })
})

UserSchema.methods.gravatar=function(){
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5=crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

module.exports = mongoose.model('User', UserSchema)