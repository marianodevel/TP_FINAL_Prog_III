/**
 * @swagger
 * /estadisticas/especialidades:
 *   get:
 *     summary: Turnos por especialidad (admin)
 *     description: Ejecuta el stored procedure `especialidades_x_turnos` y devuelve la cantidad de turnos agrupados por especialidad.
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Estadística de turnos por especialidad
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
 *                     $ref: '#/components/schemas/EstadisticaEspecialidad'
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
 * /estadisticas/medicos:
 *   get:
 *     summary: Médicos con más turnos (admin)
 *     description: Ejecuta el stored procedure `medicos_con_mas_turnos` y devuelve el ranking de médicos ordenado por cantidad de turnos.
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Ranking de médicos por cantidad de turnos
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
 *                     $ref: '#/components/schemas/EstadisticaMedico'
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
 * /estadisticas/obras-sociales:
 *   get:
 *     summary: Turnos por obra social (admin)
 *     description: Ejecuta el stored procedure `turnos_por_obra_social` y devuelve la cantidad de turnos y total facturado agrupado por obra social.
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Estadística de turnos por obra social
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
 *                     $ref: '#/components/schemas/EstadisticaObraSocial'
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
 * /estadisticas/atendidos:
 *   get:
 *     summary: Turnos atendidos vs pendientes (admin)
 *     description: Ejecuta el stored procedure `turnos_atendidos_vs_pendientes` y devuelve el resumen de estado de todos los turnos activos.
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Resumen de turnos atendidos y pendientes
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
 *                     $ref: '#/components/schemas/EstadisticaAtendidos'
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
 * /estadisticas/rango:
 *   get:
 *     summary: Turnos por rango de fechas (admin)
 *     description: Ejecuta el stored procedure `turnos_por_rango_fechas` y devuelve cantidad, total facturado y promedio para el período indicado.
 *     tags: [Estadísticas]
 *     parameters:
 *       - in: query
 *         name: fecha_desde
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-01-01"
 *         description: Fecha de inicio del rango (YYYY-MM-DD)
 *       - in: query
 *         name: fecha_hasta
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-06-30"
 *         description: Fecha de fin del rango (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Estadística del período solicitado
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
 *                     $ref: '#/components/schemas/EstadisticaRango'
 *       400:
 *         description: Faltan parámetros fecha_desde o fecha_hasta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 */
