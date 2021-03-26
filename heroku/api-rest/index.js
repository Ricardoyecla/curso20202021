'use strict'

const mongosee=require('mongoose')
const app=require('./app');
//const port=process.env.PORT || 3001
const config=require('./config')


mongosee.connect(config.db,(err,res)=>{
    if (err) {
        return console.log(`Error al conecar on Mongothrow ${err}`)
    }
    console.log("Conexion OK con Mongo")
    app.listen(config.port,()=>{
        console.log(`Api Rest con NOdejs en http://localhost:${config.port}`)
    })
})

