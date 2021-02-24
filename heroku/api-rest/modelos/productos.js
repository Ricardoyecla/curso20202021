'use strict'

const mongosee = require('mongoose')
const Schema=mongosee.Schema

const ProdutoShema=Schema({
    nombre:String,
    precio:{type:Number,default: 0},
    categoria:{type:String, enum:['componente','completo']}
})

module.exports= mongosee.model('Producto',ProdutoShema)