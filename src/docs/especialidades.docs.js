/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Listar especialidades activas
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Especialidad'
 *   post:
 *     summary: Crear especialidad (admin)
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CARDIOLOGÍA
 *     responses:
 *       201:
 *         description: Especialidad creada
 *       409:
 *         description: Ya existe
 *
 * /especialidades/{id}:
 *   get:
 *     summary: Obtener especialidad por ID
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualizar especialidad (admin)
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualizada correctamente
 *       404:
 *         description: No encontrada
 *   delete:
 *     summary: Eliminar especialidad — soft delete (admin)
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminada correctamente
 *       404:
 *         description: No encontrada
 */
