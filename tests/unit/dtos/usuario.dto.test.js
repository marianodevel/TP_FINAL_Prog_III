import { describe, it, expect } from "@jest/globals";
import { toUsuarioDTO } from "../../../src/dtos/usuario.dto.js";

describe("toUsuarioDTO", () => {
  const usuarioRaw = {
    id_usuario: 1,
    apellido: "Fernandez",
    nombres: "Benito",
    email: "ferben@correo.com",
    rol: 3,
    foto_path: null,
    contrasenia: "hash_secreto",
    activo: 1,
  };

  it("no expone contrasenia", () => {
    const dto = toUsuarioDTO(usuarioRaw);
    expect(dto).not.toHaveProperty("contrasenia");
  });

  it("no expone activo", () => {
    const dto = toUsuarioDTO(usuarioRaw);
    expect(dto).not.toHaveProperty("activo");
  });

  it("foto_path null se mantiene como null", () => {
    const dto = toUsuarioDTO({ ...usuarioRaw, foto_path: null });
    expect(dto.foto_path).toBeNull();
  });

  it("expone los campos correctos", () => {
    const dto = toUsuarioDTO(usuarioRaw);
    expect(dto).toEqual({
      id_usuario: 1,
      apellido: "Fernandez",
      nombres: "Benito",
      email: "ferben@correo.com",
      rol: 3,
      foto_path: null,
    });
  });
});
