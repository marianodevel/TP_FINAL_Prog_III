import jwt from "jsonwebtoken";

export const generarToken = (rol, id_usuario = 1) => {
  return jwt.sign({ id_usuario, rol }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const tokenAdmin = () => generarToken(3, 8);
export const tokenMedico = () => generarToken(1, 1);
export const tokenPaciente = () => generarToken(2, 5);
