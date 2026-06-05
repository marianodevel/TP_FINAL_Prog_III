import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ estado: false, msg: "Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ estado: false, msg: "Token inválido o expirado." });
  }
};

// ROL 1 = médico, ROL 2 = paciente, ROL 3 = administrador
export const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ estado: false, msg: "No autenticado." });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res
        .status(403)
        .json({
          estado: false,
          msg: "No tiene permisos para realizar esta acción.",
        });
    }
    next();
  };
};
