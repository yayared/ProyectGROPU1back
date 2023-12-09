const mongoose = require("mongoose")

const carrito_comprasModel = mongoose.Schema({
   
    nombre:{
        type: String,
        required: true
    },      
    costo:{
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("carrito_compras", carrito_comprasModel)