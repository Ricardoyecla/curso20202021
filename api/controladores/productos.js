'use strict'

const { restart } = require('nodemon')
const Producto=require('../modelos/productos')


function getProductos(req,res){
    Producto.find({},(err,productos)=>{
        if (err) return res.status(500).send({message:`Error al realizar la petición ${err}`})
        if (!productos) return res.status(404).send({message:`No existen productos`})
        
        res.status(200).send({productos})
    })
}

function getProducto(req,res){
    let productoId=req.params.id

    Producto.findById(productoId,(err,producto)=>{
        if (err) res.status(500).send({message:`Error en la petición ${err}`})
        if (!producto) res.status(404).send({message:`No hay producto con el id ${productoId}`})

        res.status(200).send({producto})
    })
}

function saveProducto(req,res){
    console.log(`POST /api/productos`)
    console.log(req.body)
 
    let producto=new Producto()
    producto.nombre =req.body.nombre
    producto.precio=req.body.precio
    producto.categoria=req.body.categoria
 
    producto.save((err,productoSalvado)=>{
         if (err) res.status(500).send({message: `Error al guardar el producto en MongoDB ${err}`})
 
         res.status(200).send({producto:productoSalvado})
    })
}

function updateProducto(req,res){
    let productoId=req.params.id

    let update=req.body

    Producto.findByIdAndUpdate(productoId,update,(err,productoActualizado)=>{
        if (err) return res.status(500).send({message:`Error al actualizar en mongoDB ${err}`})

        res.status(200).send({producto:productoActualizado})
    })
}

function deleteProducto(req,res){
    let productoId=req.params.id

    Producto.findById(productoId,(err,producto)=>{
        if (err) return res.status(500).send({message:`Error al borrar el producto en mongoDB ${err}` })

        producto.remove(err=>{
            if (err) return res.status(500).send({message:`Error al borrar producto mongoDB ${err}`})
            res.status(200).send({message:`El producto ha sido borrado`})
        })
    })
}

module.exports={
    getProducto,
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto
}