import * as authService from "../services/auth.service.js";
import { toUsuarioDTO } from "../dtos/usuario.dto.js";

export const loginController = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const result = await authService.login(email, contrasenia);

    res.status(200).json({
      estado: true,
      msg: "Login exitoso",
      data: {
        token: result.token,
        usuario: toUsuarioDTO(result.usuario),
      },
    });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ estado: false, msg: error.message });
    }
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};
