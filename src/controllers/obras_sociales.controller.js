import * as obraSocialService from "../services/obras_sociales.service.js";

export const getAll = async (req, res) => {
  try {
    const obrasSociales = await obraSocialService.getAllObrasSociales();
    res.status(200).send({ estado: true, msg: 'Obras sociales obtenidas', data: obrasSociales });
  } catch (error) {
    console.error(error);
    res.status(500).send({ estado: false, msg: 'Error interno.' });
  }
};

export const getOne = async (req, res) => {
  try {
    const id_obra_social = req.params.id_obra_social;
    const obraSocial = await obraSocialService.getObraSocialById(id_obra_social);

    if (!obraSocial) {
      return res.status(404).send({ estado: false, msg: 'Obra social no encontrada.' });
    }

    res.status(200).send({ estado: true, msg: 'API OK', data: obraSocial });
  } catch (error) {
    console.error(error);
    res.status(500).send({ estado: false, msg: 'Error interno.' });
  }
};

export const create = async (req, res) => {
  try {
    const newId = await obraSocialService.createObraSocial(req.body);
    res.status(201).send({ estado: true, msg: `ID Creado ${newId}` });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ estado: false, msg: 'El nombre de la obra social ya existe.' });
    }
    res.status(500).send({ estado: false, msg: 'Error interno.' });
  }
};

export const update = async (req, res) => {
  try {
    const id_obra_social = req.params.id_obra_social;
    const affectedRows = await obraSocialService.updateObraSocial(id_obra_social, req.body);

    if (affectedRows > 0) {
      res.status(200).send({ estado: true, msg: 'Obra social modificada' });
    } else {
      res.status(404).send({ estado: false, msg: 'Obra social no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ estado: false, msg: 'El nombre de la obra social ya está en uso.' });
    }
    res.status(500).send({ estado: false, msg: 'Error interno.' });
  }
};

export const remove = async (req, res) => {
  try {
    const id_obra_social = req.params.id_obra_social;
    const affectedRows = await obraSocialService.deleteObraSocial(id_obra_social);

    if (affectedRows > 0) {
      res.status(200).send({ estado: true, msg: 'Obra social eliminada lógicamente.' });
    } else {
      res.status(404).send({ estado: false, msg: 'Obra social no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ estado: false, msg: 'Error interno.' });
  }
};