import jwt from "jsonwebtoken";
import UsuariosRepository from "../db/repositories/usuarios.repository.js";

const usuariosRepo = new UsuariosRepository();

export const login = async (email, contrasenia) => {
  const usuario = await usuariosRepo.getByEmailYContrasenia(email, contrasenia);

  if (!usuario) {
    throw { status: 401, message: "Credenciales inválidas" };
  }

  const payload = {
    id_usuario: usuario.id_usuario,
    rol: usuario.rol,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });

  // Devolvemos el objeto completo para que el controller
  // pueda aplicar el DTO con todos los campos necesarios
  return {
    token,
    usuario: {
      id_usuario: usuario.id_usuario,
      apellido: usuario.apellido,
      nombres: usuario.nombres,
      email: usuario.email,
      rol: usuario.rol,
      foto_path: usuario.foto_path || null,
    },
  };
};
