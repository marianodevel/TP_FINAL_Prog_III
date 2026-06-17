export const validateContentType = (req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"] || "";

    const esValido =
      contentType.includes("application/json") ||
      contentType.includes("multipart/form-data");

    if (!esValido) {
      return res.status(400).json({
        estado: false,
        msg: "El Content-Type debe ser application/json o multipart/form-data.",
      });
    }
  }

  next();
};

