import * as estadisticasService from "../services/estadisticas.service.js";

export const especialidadesConMasTurnos = async (req, res) => {
  try {
    const data = await estadisticasService.getEspecialidadesConMasTurnos();
    res.status(200).json({ estado: true, msg: "OK", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const medicosConMasTurnos = async (req, res) => {
  try {
    const data = await estadisticasService.getMedicosConMasTurnos();
    res.status(200).json({ estado: true, msg: "OK", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const turnosPorObraSocial = async (req, res) => {
  try {
    const data = await estadisticasService.getTurnosPorObraSocial();
    res.status(200).json({ estado: true, msg: "OK", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const turnosAtendidosVsPendientes = async (req, res) => {
  try {
    const data = await estadisticasService.getTurnosAtendidosVsPendientes();
    res.status(200).json({ estado: true, msg: "OK", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const turnosPorRangoFechas = async (req, res) => {
  try {
    const { fecha_desde, fecha_hasta } = req.query;

    if (!fecha_desde || !fecha_hasta) {
      return res.status(400).json({
        estado: false,
        msg: "Los parámetros fecha_desde y fecha_hasta son obligatorios.",
      });
    }

    const data = await estadisticasService.getTurnosPorRangoFechas(
      fecha_desde,
      fecha_hasta,
    );
    res.status(200).json({ estado: true, msg: "OK", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};
