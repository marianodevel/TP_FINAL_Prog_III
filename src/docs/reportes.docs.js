/**
 * @swagger
 * /reportes/turnos:
 *   get:
 *     summary: Descargar informe PDF de turnos (admin)
 *     description: >
 *       Genera y descarga un informe PDF con el detalle completo de turnos.
 *       El informe incluye un resumen general (total, atendidos, pendientes,
 *       total facturado), turnos por obra social, pacientes con más turnos
 *       y el detalle fila por fila de cada turno.
 *       Se puede filtrar por rango de fechas mediante los parámetros opcionales
 *       `fecha_desde` y `fecha_hasta`. Si no se informan, se incluyen todos
 *       los turnos activos.
 *     tags: [Reportes]
 *     parameters:
 *       - in: query
 *         name: fecha_desde
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-01-01"
 *         description: Fecha de inicio del filtro (YYYY-MM-DD)
 *       - in: query
 *         name: fecha_hasta
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-06-30"
 *         description: Fecha de fin del filtro (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Archivo PDF generado correctamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nombre del archivo para descarga
 *             schema:
 *               type: string
 *               example: attachment; filename=informe_turnos_1234567890.pdf
 *           Content-Type:
 *             description: Tipo de contenido
 *             schema:
 *               type: string
 *               example: application/pdf
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
 *       404:
 *         description: No hay turnos para el período indicado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No hay turnos para generar el informe.
 *       500:
 *         description: Error al generar el PDF
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
