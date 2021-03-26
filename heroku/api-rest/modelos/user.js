'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt-nodejs')

const UserSchema= new Schema({

    email:{type:String, unique:true, lowercase:true},
    displayName:String,
    avatar: String,
    password:{type:String, select:false},
    signupDate:{type:Date, default:Date.now()},
    
})