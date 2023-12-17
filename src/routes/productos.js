const express = require("express");
const productosSchema = require("../models/productos");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         marca:
 *           type: string
 *         costo:
 *           type: number
 *         sku:
 *           type: string
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Muestra todos los productos
 *     tags: [productos]
 *     responses:
 *       200:
 *         description: Productos mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */

router.get("/productos", (req, res) => {
    productosSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ alerta: error })); 
});


/**
 * @swagger
 * /productos/sku/{skuParam}:
 *   get:
 *     summary: Obtiene un producto por su SKU
 *     tags: [productos]
 *     parameters:
 *       - in: path
 *         name: skuParam
 *         required: true
 *         description: SKU del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alerta:
 *                   type: string
 *                   description: Mensaje de alerta
 *       500:
 *         description: Error en la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alerta:
 *                   type: string
 *                   description: Mensaje de alerta
 */

router.get("/productos/sku/:skuParam", (req, res) => {
    const { skuParam } = req.params;
    productosSchema.findOne({ sku: skuParam })
        .then((data) => {
            if (!data) {
                return res.json({ alerta: "Producto no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => {
            console.error("Error en la búsqueda:", error);
            res.json({ alerta: "Error en la búsqueda" });
        });
});

/**
 * @swagger
 * /productos/nombre/{nombreParam}:
 *   get:
 *     summary: Obtiene un producto por su nombre
 *     tags: [productos]
 *     parameters:
 *       - in: path
 *         name: nombreParam
 *         required: true
 *         description: Nombre del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alerta:
 *                   type: string
 *                   description: Mensaje de alerta
 *       500:
 *         description: Error en la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alerta:
 *                   type: string
 *                   description: Mensaje de alerta
 */



router.get("/productos/nombre/:nombreParam", (req, res) => {
    const { nombreParam } = req.params;

    // Selecciona los campos que deseas devolver, incluyendo el _id
    productosSchema.find({ nombre: { $regex: new RegExp(nombreParam, 'i') } })

        .then((data) => {
            if (!data || !data.length) {
                return res.json({ alerta: "Producto no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => {
            console.error("Error en la búsqueda:", error);
            res.json({ alerta: "Error en la búsqueda" });
        });
});


// Ruta para obtener detalles del producto por ID
router.get('/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await productosSchema.findById(id);
        if (!producto) {
            return res.json({ alerta: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        console.error('Error al obtener detalles del producto por ID:', error);
        res.json({ alerta: 'Error al obtener detalles del producto por ID' });
    }
});
















module.exports = router;
