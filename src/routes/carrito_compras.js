const express = require("express");
const carrito_comprasModel = require("../models/carrito_compras");
const router = express.Router();





/**
 * @swagger
 * components:
 *   schemas:
 *     CarritoCompras:
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
 * /carrito_compras:
 *   get:
 *     summary: Muestra todos los elementos del carrito de compras
 *     tags: [carrito_compras]
 *     responses:
 *       200:
 *         description: Elementos del carrito de compras mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CarritoCompras'
 */


router.get("/carrito_compras", (req, res) => {
    carrito_comprasModel    .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ alerta: error }));
});




/**
 * @swagger
 * /carrito_compras:
 *   post:
 *     summary: Agrega un nuevo elemento al carrito de compras
 *     tags: [carrito_compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               costo:
 *                 type: number
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Elemento agregado al carrito de compras correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 costo:
 *                   type: number
 *                 cantidad:
 *                   type: number
 */


router.post("/carrito_compras/nombre", (req, res) => {
    const { nombre, costo, cantidad } = req.body;

    const nuevoItem = new carrito_comprasModel({
        nombre: nombre,
        costo: costo,
        cantidad: cantidad
    });

    nuevoItem.save()
        .then((data) => {
            // Eliminar el campo __v antes de enviar la respuesta al cliente
            const { __v, ...responseData } = data.toObject();
            res.json(responseData);
        })
        .catch((error) => res.json({ alerta: error }));
});


/**
 * @swagger
 * /carrito_compras/{nombre}:
 *   put:
 *     summary: Actualiza la cantidad de un elemento en el carrito de compras
 *     tags: [carrito_compras]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del elemento en el carrito de compras
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevaCantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Elemento en el carrito de compras actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CarritoCompras'
 *       404:
 *         description: Elemento no encontrado en el carrito de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 */

router.put("/carrito_compras/:nombre", (req, res) => {
    const { nombre } = req.params;
    const { nuevaCantidad } = req.body;

    carrito_comprasModel.findOneAndUpdate({ nombre: nombre }, { $set: { cantidad: nuevaCantidad } }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ mensaje: "Objeto no encontrado" });
            }
            res.json({ mensaje: "Objeto actualizado", data });
        })
        .catch((error) => res.json({ alerta: error }));
});


/**
 * @swagger
 * /carrito_compras/{nombre}:
 *   delete:
 *     summary: Elimina un elemento del carrito de compras
 *     tags: [carrito_compras]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del elemento en el carrito de compras
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Elemento del carrito de compras eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       404:
 *         description: Elemento no encontrado en el carrito de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 */


router.delete("/carrito_compras/:nombre", (req, res) => {
    const { nombre } = req.params;

    carrito_comprasModel.deleteOne({ nombre: nombre })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ mensaje: "Objeto no encontrado" });
            }
            res.json({ mensaje: "Objeto eliminado" });
        })
        .catch((error) => res.json({ alerta: error }));
});


module.exports = router;
