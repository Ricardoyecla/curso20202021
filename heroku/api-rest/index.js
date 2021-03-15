'use strict'

const mongosee=require('mongoose')
const app=require('./app');
const port=process.env.PORT || 3001

mongosee.connect('mongodb://localhost/tienda',(err,res)=>{
    if (err) {
        return console.log(`Error al conecar on Mongothrow ${err}`)
    }
    console.log("Conexion OK con Mongo")
    app.listen(port,()=>{
        console.log(`Api Rest con NOdejs en http://localhost:${port}`)
    })
})

