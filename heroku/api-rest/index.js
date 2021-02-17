'use strict'

const express = require('express');
const bodyParser= require('body-parser');

const app= express();

//Asignamos a port el valor de la variable de entorno o 3000
const port= process.env.PORT || 3001 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // Para permitir json en los mensajes

app.listen(port,()=>{
    console.log(`APi Rest de nOde.Js en http://locallhost:${port} `)
})