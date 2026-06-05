import EstadisticasRepository from "../db/repositories/estadisticas.repository.js";

const estadisticasRepo = new EstadisticasRepository();

export const getEspecialidadesConMasTurnos = async () => {
  return await estadisticasRepo.especialidadesConMasTurnos();
};

export const getMedicosConMasTurnos = async () => {
  return await estadisticasRepo.medicosConMasTurnos();
};

export const getTurnosPorObraSocial = async () => {
  return await estadisticasRepo.turnosPorObraSocial();
};

export const getTurnosAtendidosVsPendientes = async () => {
  return await estadisticasRepo.turnosAtendidosVsPendientes();
};

export const getTurnosPorRangoFechas = async (fecha_desde, fecha_hasta) => {
  return await estadisticasRepo.turnosPorRangoFechas(fecha_desde, fecha_hasta);
};
