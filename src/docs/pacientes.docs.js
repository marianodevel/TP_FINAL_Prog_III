/**
 * @swagger
 * /pacientes/me:
 *   get:
 *     summary: Ver perfil propio (paciente)
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Perfil del paciente autenticado
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
 *                   $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Perfil de paciente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /pacientes:
 *   get:
 *     summary: Listar todos los pacientes (admin)
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
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
 *                     $ref: '#/components/schemas/Paciente'
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
 * /pacientes/{id_paciente}:
 *   get:
 *     summary: Obtener paciente por ID (admin)
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Paciente encontrado
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
 *                   $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /pacientes/{id_paciente}/obra-social:
 *   patch:
 *     summary: Actualizar obra social de un paciente (admin)
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
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
 *         description: Obra social actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Paciente u obra social no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
