'use strict'

const express = require('express');
const bodyParser= require('body-parser');

const app= express();

//Asignamos a port el valor de la variable de entorno o 3000
const port= process.env.PORT || 3001 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // Para permitir json en los mensajes

//Los endPoint
//req es la petición y res es la respuesta.
app.get('/hola',(req,res)=>{
    res.send({message:'Hola Mundo'})
})
//Parametros en la url
app.get('/hola/:name',(req,res)=>{
    res.send({message:`Hola ${req.params.name}`})
})

//Muestra todos los productos todos los productos
app.get('/api/productos',(req,res)=>{
    res.send(200,{productos:[]})
})

//Muestra el producto con Id inciado
app.get('/api/productos/:productoId',(req,res)=>{
    
})

//Añade un producto
//Gracias al middleware de body-parse en body tenemos los datos de la petición
app.post('/api/productos',(req,res)=>{
    console.log(req.body)
    res.status(200).send({message:"El produco se ha recibido"})
})

//Modifica un producto
app.put('/api/productos/:productoId',(req,res)=>{

})

//Borrar uin producto de la base de datos
app.delete('/api/productos/:productoId',(req,res)=>{

})


app.listen(port,()=>{
    console.log(`APi Rest de nOde.Js en http://locallhost:${port} `)
})