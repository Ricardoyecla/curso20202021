'use strict'

const express = require('express');
const ctrlProducto=require('../controlador/productos');
const api=express.Router();

api.get('/productos/:id',ctrlProducto.getProducto);
api.get('productos',ctrlProducto.getProductos);
api.post('/productos',ctrlProducto.saveProducto);
api.put('/productos/:id',ctrlProducto.updateProducto);
api.delete('/productos/:id',ctrlProducto.deleteProducto);

module.exports=api