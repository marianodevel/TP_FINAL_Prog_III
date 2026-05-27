/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Listar todos los turnos (admin)
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos
 *   post:
 *     summary: Registrar turno para paciente y médico (admin)
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_medico, id_paciente, id_obra_social, fecha_hora]
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_paciente:
 *                 type: integer
 *                 example: 1
 *               id_obra_social:
 *                 type: integer
 *                 example: 1
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-15T10:00:00"
 *     responses:
 *       201:
 *         description: Turno registrado
 *       409:
 *         description: Horario ocupado
 *
 * /turnos/mis-turnos:
 *   get:
 *     summary: Listar turnos propios (médico)
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos del médico
 *
 * /turnos/mis-reservas:
 *   get:
 *     summary: Listar reservas propias (paciente)
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos del paciente
 *
 * /turnos/reserva:
 *   post:
 *     summary: Crear reserva propia (paciente)
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_medico, fecha_hora]
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-15T10:00:00"
 *     responses:
 *       201:
 *         description: Reserva creada
 *
 * /turnos/{id_turno}/atendido:
 *   patch:
 *     summary: Marcar turno como atendido (médico)
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
 *       403:
 *         description: Sin permiso sobre este turno
 *       404:
 *         description: Turno no encontrado
 *
 * /turnos/{id_turno}:
 *   get:
 *     summary: Obtener turno por ID (admin)
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno encontrado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar turno — soft delete (admin)
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *
 * /reportes/turnos:
 *   get:
 *     summary: Descargar informe PDF de turnos (admin)
 *     tags: [Reportes]
 *     parameters:
 *       - in: query
 *         name: fecha_desde
 *         schema:
 *           type: string
 *         example: "2026-01-01"
 *       - in: query
 *         name: fecha_hasta
 *         schema:
 *           type: string
 *         example: "2026-12-31"
 *     responses:
 *       200:
 *         description: Archivo PDF
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Sin turnos para el período
 */
