const mongoose = require("mongoose");

const RegistroSchema = mongoose.Schema({
    NombreCompleto: {
        type: String,
        required: true
    },
    Nombreusuario: {
        type: String,
        required: true,
        unique: true // Para asegurar que no haya nombres de usuario duplicados
    },
    contraseña: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String, // Puedes cambiar a Number si prefieres almacenar el teléfono como un número
        required: true
    },
    fecha: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("Registro", RegistroSchema);