/**
 * @swagger
 * /obras-sociales:
 *   get:
 *     summary: Listar todas las obras sociales activas
 *     tags: [Obras Sociales]
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Obras sociales obtenidas
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ObraSocial'
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Crear obra social (admin)
 *     tags: [Obras Sociales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialRequest'
 *     responses:
 *       201:
 *         description: Obra social creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: ID Creado 5
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El nombre de la obra social ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /obras-sociales/{id_obra_social}:
 *   get:
 *     summary: Obtener obra social por ID
 *     tags: [Obras Sociales]
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Obra social encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: API OK
 *                 data:
 *                   $ref: '#/components/schemas/ObraSocial'
 *       404:
 *         description: Obra social no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Actualizar obra social (admin)
 *     tags: [Obras Sociales]
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialRequest'
 *     responses:
 *       200:
 *         description: Obra social actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Obra social no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El nombre de la obra social ya está en uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Eliminar obra social — soft delete (admin)
 *     tags: [Obras Sociales]
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Obra social eliminada lógicamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Obra social no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
