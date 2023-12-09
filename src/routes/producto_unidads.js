const express = require("express");
const producto_unidadModel = require("../models/producto_unidads");
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductoUnidad:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         costo:
 *           type: number
 *         cantidad:
 *           type: number
 */

/**
 * @swagger
 * /producto_unidad:
 *   get:
 *     summary: Muestra el producto seleccionado del usuario
 *     tags: [producto_unidad]
 *     responses:
 *       200:
 *         description: Productos por unidad mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductoUnidad'
 */

router.get("/producto_unidad", (req, res) => {
    producto_unidadModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ alerta: error }));
});

/**
 * @swagger
 * /producto_unidad/cambiar-cantidad:
 *   put:
 *     summary: Cambia la cantidad de productos por unidad
 *     tags: [producto_unidad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cantidad de productos por unidad actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 */

router.put("/producto_unidad/cambiar-cantidad", (req, res) => {
    const nuevaCantidad = req.body.cantidad;

    if (nuevaCantidad === undefined || isNaN(nuevaCantidad)) {
        return res.status(400).json({ error: "La cantidad proporcionada no es válida." });
    }

    producto_unidadModel.findOneAndUpdate({}, { cantidad: nuevaCantidad }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "No se encontró ningún producto por unidad." });
            }
            res.json({ mensaje: "Cantidad actualizada correctamente", producto: data });
        })
        .catch((error) => res.status(500).json({ error: error.message }));
});


module.exports = router;
