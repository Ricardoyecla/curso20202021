'use strict'

const express=require('express');
const bodyParse=require('body-parser');

const app=express();

app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

const mongoose=require('mongoose')
const ctrlProducto=require('./controladores/productos')
//EndPoints

app.get('/api/productos',ctrlProducto.getProductos)
app.get('/api/producto/:id',ctrlProducto.getProducto)
app.post('/api/productos',ctrlProducto.saveProducto)
app.put('/api/productos/:id',ctrlProducto.updateProducto)
app.delete('/api/productos/:id',ctrlProducto.deleteProducto)



//Creamos variable de entorno para el puero donde escucha express

const port = process.env.PORT || 3001

mongoose.connect('mongodb://localhost/tienda',(err,res)=>{
    if(err){
        return console.log(`Error al conectar con MongoDB error ${err}`)
    }
    console.log(`Conexión OK con Mongo`)

    app.listen(port,()=>{
        console.log (`Api Rest de N0de.Js en http://localhost:${port}`)
    })
})

