import * as usuariosService from "../services/usuarios.service.js";

const handleError = (error, res) => {
  if (error.status) {
    return res.status(error.status).json({ estado: false, msg: error.message });
  }
  if (error.code === "ER_DUP_ENTRY") {
    const campo = error.message.includes("email") ? "email" : "documento";
    return res.status(409).json({
      estado: false,
      msg: `El ${campo} ya está registrado.`,
    });
  }
  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(404).json({
      estado: false,
      msg: "Una referencia (obra social, especialidad) no existe.",
    });
  }
  console.error(error);
  res.status(500).json({ estado: false, msg: "Error interno del servidor" });
};

export const registrarPaciente = async (req, res) => {
  try {
    const id_usuario = await usuariosService.registrarPaciente(req.body);
    res.status(201).json({
      estado: true,
      msg: "Paciente registrado correctamente",
      data: { id_usuario },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const registrarMedico = async (req, res) => {
  try {
    const id_usuario = await usuariosService.registrarMedico(req.body);
    res.status(201).json({
      estado: true,
      msg: "Médico registrado correctamente",
      data: { id_usuario },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const registrarAdmin = async (req, res) => {
  try {
    const id_usuario = await usuariosService.registrarAdmin(req.body);
    res.status(201).json({
      estado: true,
      msg: "Administrador registrado correctamente",
      data: { id_usuario },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const subirFoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        estado: false,
        msg: "No se recibió ninguna imagen.",
      });
    }

    const { id_usuario } = req.usuario;
    const nuevoPath = req.file.path;

    await usuariosService.actualizarFoto(id_usuario, nuevoPath);

    res.status(200).json({
      estado: true,
      msg: "Foto de perfil actualizada correctamente",
      data: { foto_path: nuevoPath },
    });
  } catch (error) {
    handleError(error, res);
  }
};
