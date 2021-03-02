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
    //Con el metodo find del esquema monogoose pasando {}
    //nos devuelve como parametro del callback o un error o un json
    //con los todos los productos
    //comprobamos error o productos vacios
    //Envimos el json con los productos
   Producto.find({},(err,productos)=>{
        if (err) return res.status(500).send({message:`Error al realizar la peción ${err}`})
        if(!productos) return res.status(404).send({message:`No existen productos`})
    
    // como la clave y el valor que enviamos se llaman igual se puede escribir 
    // de forma resumida
        res.status(200).send({productos})
   })
})

app.get('/api/productos/:id',(req,res)=>{
    //Recuperamos de la petición (req) el id del producto
    let productoId =req.params.id

    //Buscamos con findById un producto con el identificar
    Producto.findById(productoId,(err,producto)=>{
        if (err) return res.status(500).send({message:`Error al realizar la peción ${err}`})
        if(!producto) return res.status(404).send({message:`xxxxNo existe el producto`})

        //Si esta o no hay error devolvemos el producto
        res.status(200).send({producto})
    })

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
    //Tomamos el id del producto a actualizar
    let productoId=req.params.id
    //Tomamos del body los datos a actualizar del producto
    //para el id anterior
    let update=req.body
    //Ejecutamos findByIdAndUpdate al que pasamos el id del producto a actulizar
    //y los datos que queremos actulizar
    Producto.findByIdAndUpdate(productoId,update,(err,productoÁctualizado)=>{
        //Si todo ha ido bien nos devuelve al producto actualizado 
        if (err) return res.status(500).send({message:`Error al actualizar en mongoDB} ${err}`})
        
        res.status(200).send({producto:productoÁctualizado})
    })

})
app.delete('/api/productos/:id',(req,res)=>{
      //Tomamos el id del producto a borrar
    let productoId=req.params.id

    //Buscamos el producto con findById, si esta nos devuelve el producto
    //Que usaremos para hacer remove con el esquema.
    Producto.findById(productoId,(err,producto)=>{
        if (err) return res.status(500).send({message:`Error al borrar producto en  mongoDB} ${err}`})

        producto.remove(err=>{
            if (err) return res.status(500).send({message:`Error al borrar producto en  mongoDB} ${err}`})
            res.status(200).send({message:`El producto ha sido elimnado`})
        })
    })
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

