const mongoose = require("mongoose")

const ventasModel = mongoose.Schema({
   
    NombreCompleto:{
        type: String,
        required: true
    },      
    Email:{
        type: String,
        required: true
    },
    Direccion:{
        type: String,
        required: true
    },
    Ciudad:{
        type: String,
        required: true
    },
    TitularDeLaTarjeta:{
        type: String,
        required: true
    },
    NumeroDeTarjeta:{
        type: Number,
        required: true
    },
    Departamento:{
        type: String,
        required: true
    },
    Estado:{
        type: String,
        required: true
    },
    CodigoPostal:{
        type: Number,
        required: true
    },
    Vencimiento:{
        type: String,
        required: true
    },
    CVV:{
        type: Number,
        required: true
    },


})

module.exports = mongoose.model("ventas", ventasModel)