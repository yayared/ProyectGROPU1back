const express = require("express");
const router = express.Router();
const RegistroSchema = require("../models/registro");

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
 *   get:
 *     summary: Obtiene la información de todos los usuarios registrados o de un usuario específico por Nombreusuario y contraseña
 *     tags: [registro]
 *     parameters:
 *       - in: query
 *         name: Nombreusuario
 *         description: Nombre de usuario para búsqueda
 *         schema:
 *           type: string
 *       - in: query
 *         name: contraseña
 *         description: Contraseña para búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información de los usuarios obtenida correctamente
 *       500:
 *         description: Error interno del servidor
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
        .catch((error) => res.status(500).json({ alerta: error }));
});

router.get("/registro", (req, res) => {
    const { Nombreusuario, contraseña } = req.query;

    // Verifica si se proporcionaron Nombreusuario y contraseña
    if (Nombreusuario && contraseña) {
        RegistroSchema.findOne({ Nombreusuario, contraseña })
            .then((usuario) => {
                if (usuario) {
                    res.status(200).json(usuario);
                } else {
                    res.status(404).json({ mensaje: "Usuario no encontrado" });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ mensaje: "Error interno del servidor" });
            });
    } else {
        // Si no se proporcionan parámetros, devuelve todos los usuarios
        RegistroSchema.find()
            .then((usuarios) => {
                res.status(200).json(usuarios);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ mensaje: "Error interno del servidor" });
            });
    }
});

module.exports = router;