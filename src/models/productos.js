    const mongoose = require("mongoose");

    const productosSchema = mongoose.Schema({
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        marca: {
            type: String,
            required: true
        },
        costo: {
            type: Number,  
            required: true
        },
        sku: {
            type: String,
            required:  true
        }
    });

    module.exports = mongoose.model("productos", productosSchema);