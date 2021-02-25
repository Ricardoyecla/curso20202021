'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongosee=require('mongoose')

const Producto=require('./modelos/productos')

const port=process.env.PORT || 3001
const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//EndPoint
app.get('/adios',(req,res)=>{
    res.send({message: "Adios es tarde"})
})

app.get('/adios/:name',(req,res)=>{
    res.send({message: `Adios es ${req.params.name}`})
})

app.get('/api/productos',(req,res)=>{
    res.send(200,{productos:[]})
})

app.get('/api/productos/:id',(req,res)=>{

})
app.post('/api/productos',(req,res)=>{
    /* console.log(req.body)
    res.send(200,{message:"El producto se ha recibido"}) */
    console.log('POST /api/productos')
    console.log(req.body)

    let producto=new Producto()
    producto.nombre=req.body.nombre
    producto.precio=req.body.precio
    producto.categoria=req.body.categoria

    producto.save((err,productoSalvado)=>{
        if (err) res.status(500).send({message:`Error al guarda en mongoDB} ${err}`})
        
        res.status(200).send({producto:productoSalvado} )
    })

})
app.put('/api/productos/:id',(req,res)=>{

})
app.delete('/api/productos/:id',(req,res)=>{

})

mongosee.connect('mongodb://localhost/tienda',(err,res)=>{
    if (err) {
        return console.log(`Error al conecar on Mongothrow ${err}`)
    }
    console.log("Conexion OK con Mongo")
    app.listen(port,()=>{
        console.log(`Api Rest con NOdejs en http://localhost:${port}`)
    })
})

