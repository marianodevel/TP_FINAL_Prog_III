/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Listar todos los médicos o filtrar por especialidad
 *     tags: [Médicos]
 *     parameters:
 *       - in: query
 *         name: especialidad
 *         schema:
 *           type: integer
 *         description: ID de especialidad para filtrar
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de médicos
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
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Medico'
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Sin permisos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /medicos/{id_medico}:
 *   get:
 *     summary: Obtener médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Médico encontrado
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
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Medico'
 *       404:
 *         description: Médico no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Actualizar datos de un médico (admin)
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicoUpdateRequest'
 *     responses:
 *       200:
 *         description: Médico actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Médico no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: La matrícula ya está en uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /medicos/{id_medico}/obras-sociales:
 *   get:
 *     summary: Listar obras sociales de un médico (admin)
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de obras sociales del médico
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
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ObraSocial'
 *       404:
 *         description: Médico no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Asociar obra social a un médico (admin)
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_obra_social]
 *             properties:
 *               id_obra_social:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Obra social asociada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Médico u obra social no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /medicos/{id_medico}/obras-sociales/{id_obra_social}:
 *   delete:
 *     summary: Desasociar obra social de un médico (admin)
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Obra social desasociada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Asociación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
