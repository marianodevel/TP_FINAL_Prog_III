USE prog3_turnos;

-- Renombrar columna atentido → atendido en turnos_reservas
ALTER TABLE turnos_reservas
  CHANGE `atentido` `atendido` TINYINT(3) UNSIGNED NOT NULL DEFAULT 0;

-- Actualizar stored procedure turnos_atendidos_vs_pendientes
DROP PROCEDURE IF EXISTS `turnos_atendidos_vs_pendientes`;

DELIMITER $$
CREATE PROCEDURE `turnos_atendidos_vs_pendientes`()
BEGIN
  SELECT
    SUM(CASE WHEN atendido = 1 THEN 1 ELSE 0 END) AS atendidos,
    SUM(CASE WHEN atendido = 0 THEN 1 ELSE 0 END) AS pendientes,
    COUNT(*) AS total
  FROM turnos_reservas
  WHERE activo = 1;
END$$
DELIMITER ;
