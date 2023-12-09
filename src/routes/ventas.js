const express = require("express");
const ventasModel = require("../models/ventas");
const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     Ventas:
 *       type: object
 *       properties:
 *         NombreCompleto:
 *           type: string
 *         Email:
 *           type: string
 *         Direccion:
 *           type: string
 *         Ciudad:
 *           type: string
 *         TitularDeLaTarjeta:
 *           type: string
 *         NumeroDeTarjeta:
 *           type: number
 *         Departamento:
 *           type: string
 *         Estado:
 *           type: string
 *         CodigoPostal:
 *           type: number
 *         Vencimiento:
 *           type: string
 *         CVV:
 *           type: number
 *
 * /ventas:
 *   post:
 *     summary: Realiza una venta
 *     tags: [ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ventas'
 *     responses:
 *       200:
 *         description: Venta realizada correctamente
 *       400:
 *         description: Error en la solicitud
 */

router.post("/ventas", (req, res) => {
    const { NombreCompleto, Email, Direccion, Ciudad, TitularDeLaTarjeta, NumeroDeTarjeta, Departamento, Estado, CodigoPostal, Vencimiento, CVV } = req.body;

    const nuevaVentas = new ventasModel({
        NombreCompleto,
        Email,
        Direccion,
        Ciudad,
        TitularDeLaTarjeta,
        NumeroDeTarjeta,
        Departamento,
        Estado,
        CodigoPostal,
        Vencimiento,
        CVV
    });

    nuevaVentas.save()
        .then((data) => {
            // Eliminar el campo __v antes de enviar la respuesta al cliente
            const { __v, ...responseData } = data.toObject();
            res.json(responseData);
        })
        .catch((error) => res.json({ alerta: error }));
});

module.exports = router;
