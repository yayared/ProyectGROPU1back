const mongoose = require("mongoose")

const producto_unidadModel = mongoose.Schema({
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
    }
 






    
})

module.exports = mongoose.model("producto_unidad", producto_unidadModel);