'use stric'

const mongoose =require('mongoose')
const Schema = mongoose.Schema

const ProcutosSchema= Schema({
    nombre: String,
    imagen: String,
    precio: {type:Number,default:0},
    categoria: {type:String, enum: ['mesas','sillas','sofas']},
    descriccion: String
})

//exprtar este modulo usamos el metodo model al que le pasamos
//Nombre de modelo y un esquema
module.exports=mongoose.model('Producto',ProcutosSchema)