USE prog3_turnos;

DELIMITER $$

-- Turnos por especialidad (ya existe en el seed, la dejamos como está)
-- Aquí agregamos las restantes

-- Médicos con más turnos
CREATE PROCEDURE IF NOT EXISTS `medicos_con_mas_turnos`()
BEGIN
  SELECT
    COUNT(tr.id_turno_reserva) AS cantidad_turnos,
    m.id_medico,
    u.apellido,
    u.nombres,
    e.nombre AS especialidad
  FROM turnos_reservas tr
  INNER JOIN medicos m ON tr.id_medico = m.id_medico
  INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
  INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
  WHERE tr.activo = 1
  GROUP BY m.id_medico, u.apellido, u.nombres, e.nombre
  ORDER BY cantidad_turnos DESC;
END$$

-- Turnos por obra social
CREATE PROCEDURE IF NOT EXISTS `turnos_por_obra_social`()
BEGIN
  SELECT
    COUNT(tr.id_turno_reserva) AS cantidad_turnos,
    os.id_obra_social,
    os.nombre AS obra_social,
    SUM(tr.valor_total) AS total_facturado
  FROM turnos_reservas tr
  INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
  WHERE tr.activo = 1
  GROUP BY os.id_obra_social, os.nombre
  ORDER BY cantidad_turnos DESC;
END$$

-- Turnos atendidos vs pendientes
CREATE PROCEDURE IF NOT EXISTS `turnos_atendidos_vs_pendientes`()
BEGIN
  SELECT
    SUM(CASE WHEN atentido = 1 THEN 1 ELSE 0 END) AS atendidos,
    SUM(CASE WHEN atentido = 0 THEN 1 ELSE 0 END) AS pendientes,
    COUNT(*) AS total
  FROM turnos_reservas
  WHERE activo = 1;
END$$

-- Turnos por rango de fechas
CREATE PROCEDURE IF NOT EXISTS `turnos_por_rango_fechas`(
  IN fecha_desde DATETIME,
  IN fecha_hasta DATETIME
)
BEGIN
  SELECT
    COUNT(tr.id_turno_reserva) AS cantidad_turnos,
    SUM(tr.valor_total) AS total_facturado,
    AVG(tr.valor_total) AS promedio_valor
  FROM turnos_reservas tr
  WHERE tr.fecha_hora BETWEEN fecha_desde AND fecha_hasta
    AND tr.activo = 1;
END$$

DELIMITER ;
