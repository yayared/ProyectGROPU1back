const express = require("express");
const router = express.Router();
const RegistroSchema = require("../models/registro"); // Asegúrate de ajustar la ruta según la estructura de tu proyecto

/**
 * @swagger
 * components:
 *   schemas:
 *     Registro:
 *       type: object
 *       properties:
 *         NombreCompleto:
 *           type: string
 *         Nombreusuario:
 *           type: string
 *         contraseña:
 *           type: string
 *         direccion:
 *           type: string
 *         telefono:
 *           type: string
 *         fecha:
 *           type: string
 *
 * /registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [registro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registro'
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en la solicitud
 */

router.post("/registro", (req, res) => {
    const { NombreCompleto, Nombreusuario, contraseña, direccion, telefono, fecha } = req.body;

    const nuevoRegistro = new RegistroSchema({
        NombreCompleto,
        Nombreusuario,
        contraseña,
        direccion,
        telefono,
        fecha
        
    });

    nuevoRegistro.save()
        .then((data) => {
            // Eliminar el campo __v antes de enviar la respuesta al cliente
            const { __v, ...responseData } = data.toObject();
            res.json(responseData);
        })
        .catch((error) => res.json({ alerta: error }));
});

module.exports = router;