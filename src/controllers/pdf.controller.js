import * as turnosService from "../services/turnos.service.js";
import { generarPDFTurnos } from "../services/pdf.service.js";

export const informeTurnos = async (req, res) => {
  try {
    const { fecha_desde, fecha_hasta } = req.query;

    let turnos = await turnosService.getAllTurnos();

    // Filtro opcional por rango de fechas
    if (fecha_desde && fecha_hasta) {
      const desde = new Date(fecha_desde);
      const hasta = new Date(fecha_hasta);
      turnos = turnos.filter((t) => {
        const fecha = new Date(t.fecha_hora);
        return fecha >= desde && fecha <= hasta;
      });
    }

    if (turnos.length === 0) {
      return res.status(404).json({
        estado: false,
        msg: "No hay turnos para generar el informe.",
      });
    }

    generarPDFTurnos(turnos, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error al generar el PDF." });
  }
};
